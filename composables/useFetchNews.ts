import type { NewsFilters, NewsPagination } from '~/types/news'

export const useFetchNews = () => {
  const fetchNews = async (
    filters: NewsFilters,
    pagination: NewsPagination
  ) => {
    const { data, error, pending } = await useAsyncData(
      `news-${filters.source}-${filters.search}-${pagination.page}`,
      () => $fetch('/api/news', {
        query: {
          source: filters.source,
          search: filters.search || undefined,
          page: pagination.page,
          limit: pagination.limit
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
