import type { FilterSource } from '~/types/news'

interface FetchNewsParams {
  source?: FilterSource
  search?: string
  page?: number
  limit?: number
}

export const PAGINATION_LIMIT = 10

export const useFetchNews = () => {
  const fetchNews = async (params: FetchNewsParams) => {
    const { data, error, pending } = await useAsyncData(
      `news-${params.source}-${params.search}-${params.page}`,
      () => $fetch('/api/news', {
        query: {
          source: params.source || 'all',
          search: params.search || undefined,
          page: params.page || 1,
          limit: params.limit || PAGINATION_LIMIT,
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
