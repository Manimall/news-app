import { useRoute, useRouter } from '#imports'

export const usePagination = () => {
  const route = useRoute()
  const router = useRouter()

  const goToPage = async (page: number, totalPages: number) => {
    if (
      page === Number(route.query.page) ||
      page < 1 ||
      page > totalPages
    ) return

    await router.push({
      query: {
        ...route.query,
        page: page > 1 ? page : undefined
      }
    })

    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return {
    goToPage
  }
}
