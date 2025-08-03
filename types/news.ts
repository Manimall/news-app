export interface NewsItem {
  id: string
  title: string
  content: string
  date: string
  source: 'mos' | 'lenta' | 'ria'
  image: string | null
}

export type NewsViewMode = 'grid' | 'list'

export type FilterSource = 'all' | NewsItem['source']

export interface NewsFilters {
  source: FilterSource
  search: string
}

export interface NewsPagination {
  page: number
  limit: number
  total: number
}
