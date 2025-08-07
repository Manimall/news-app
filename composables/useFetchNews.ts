export const PAGINATION_LIMIT = 10

export const useFetchNews = () => {
  const route = useRoute()

  const fetchNews = async () => {
    const { data, error, pending } = await useAsyncData(
      `news-${route.query.source}-${route.query.search}-${route.query.page}`,
      () => $fetch('/api/news', {
        query: {
          source: route.query.source || 'all',
          search: route.query.search?.toString().toLowerCase() || undefined,
          page: Number(route.query.page) || 1,
          limit: PAGINATION_LIMIT,
        }
      })
    )

    return {
      data: data.value,
      error,
      pending
    }
  }

  return { fetchNews }
}
