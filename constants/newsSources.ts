import type { FilterSource } from "~/types/news"

export interface NewsSource {
  id: FilterSource
  name: string
  url: string
  rssUrl: string
}

export interface FilterOption {
  value: FilterSource
  label: string
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'mos',
    name: 'Mos.ru',
    url: process.env.NUXT_PUBLIC_MOS_API_URL || '',
    rssUrl: process.env.NUXT_PUBLIC_MOS_RSS_URL || ''
  },
  {
    id: 'lenta',
    name: 'Lenta.ru',
    url: process.env.NUXT_PUBLIC_LENTA_API_URL || '',
    rssUrl: process.env.NUXT_PUBLIC_LENTA_RSS_URL || ''
  },
  {
    id: 'ria',
    name: 'Ria.ru',
    url: process.env.NUXT_PUBLIC_RIA_API_URL || '',
    rssUrl: process.env.NUXT_PUBLIC_RIA_RSS_URL || ''
  }
]

export const DEFAULT_SOURCE = 'all'

export const generateSourceFilters = (): FilterOption[] => [
  { value: DEFAULT_SOURCE, label: 'Все' },
  ...NEWS_SOURCES.map(source => ({
    value: source.id,
    label: source.name
  }))
]

export const getSourceUrl = (id: FilterSource): string =>
  NEWS_SOURCES.find(s => s.id === id)?.url || '#'
