import { parseString } from 'xml2js'

const getDescription = (desc: string[] | string) => {
  if (!desc || (Array.isArray(desc) && desc.join('').trim() === '')) {
    return 'Описание текущей новости отсутствует'
  }

  const text = Array.isArray(desc) ? desc.join(' ') : desc

  return text.trim().replace(/\s+/g, ' ')
};

async function fetchAndParseRss(sourceKey: string, url: string) {
  try {
    if (!url) {
      console.error(`URL не указан для источника ${sourceKey}`)
      return []
    }

    console.log('Fetching RSS from:', url); // debug url

    const xmlRaw = await $fetch(url, {
      responseType: 'text',
      timeout: 3000,
    }) as string

    if (typeof xmlRaw !== 'string') {
      throw new Error('Invalid response type - expected string')
    }

    const xmlClean = xmlRaw
      .replace(/^\uFEFF/, '')
      .replace(/^[\s]+/, '')
      .trim()

    if (!xmlClean.startsWith('<?xml')) {
      throw new Error('Invalid XML format')
    }

    const parsed = await new Promise<any>((resolve, reject) => {
      parseString(xmlClean, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })

    const channel = parsed.rss?.channel?.[0] || parsed.rss?.$?.channel?.[0]
    if (!channel || !channel.item) {
      throw new Error('Invalid RSS format: no channel or items found')
    }

    return channel.item.map((item: any) => {
      const imageUrl = item['media:content']?.[0]?.['$']?.url
        || (item.enclosure?.[0]?.['$']?.type?.startsWith('image/') && item.enclosure[0]['$'].url)
        || item['media:thumbnail']?.[0]?.['$']?.url
        || (item.description?.[0]?.match(/<img[^>]+src="([^">]+)"/)?.[1]);

      return {
        id: item.guid?.[0]?._ || item.guid?.[0] || item.link?.[0],
        title: item.title?.[0] || 'Без названия',
        content: getDescription(item.description) || getDescription(item.content) || '',
        date: item.pubDate?.[0] || item.date?.[0] || new Date().toISOString(),
        source: sourceKey,
        image: imageUrl || null,
      };
    })

  } catch (error) {
    console.error(`Ошибка при обработке ${sourceKey}:`, error)
    return []
  }
}

export default defineEventHandler(async (event) => {
  console.log('Request URL:', event.node.req.url)
  console.log('Query params:', getQuery(event))

  const { source = 'all', page = 1, limit = 10, search } = getQuery(event)
  const config = useRuntimeConfig().public.rssFeeds

  const sources = source === 'all'
    ? Object.entries(config)
    : Object.entries(config).filter(([key]) => key === source)

  const results = await Promise.all(
    sources.map(([sourceKey, url]) => fetchAndParseRss(sourceKey, url))
  )

  let allItems = results
    .flat()
    .filter(item => item.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (search) {
    const searchTerm = String(search).toLowerCase();
    allItems = allItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
    );
  }

  // server pagination
  const start = (Number(page) - 1) * Number(limit)
  const paginatedItems = allItems.slice(start, start + Number(limit))

  return {
    data: paginatedItems,
    total: allItems.length,
    page: Number(page),
    limit: Number(limit),
  }
})
