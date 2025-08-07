import { defineStore } from 'pinia'
import type {
  NewsItem,
  NewsViewMode,
  FilterSource
} from '~/types/news'

interface NewsState {
  items: NewsItem[]
  view: NewsViewMode
  isLoading: boolean
  error: string | null
  totalItems: number
}

export const useNewsStore = defineStore('news', {
  state: (): NewsState => ({
    items: [],
    view: 'grid',
    isLoading: false,
    error: null,
    totalItems: 0
  }),

  actions: {
    async fetchNews() {
      try {
        if (this.isLoading) return

        const route = useRoute()
        this.isLoading = true
        this.error = null

        const { fetchNews } = useFetchNews()
        const { data, error } = await fetchNews({
          source: route.query.source as FilterSource,
          search: route.query.search?.toString(),
          page: Number(route.query.page),
          limit: PAGINATION_LIMIT,
        })

        if (error.value) throw new Error(error.value.message)

        this.items = data?.data || []
        this.totalItems = data?.total || 0
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch news'
      } finally {
        this.isLoading = false
      }
    },

    updateSourceFilter(source: FilterSource) {
      const route = useRoute()
      if ((route.query.source as FilterSource) === source) return

      const router = useRouter()
      router.push({
        query: {
          ...route.query,
          source,
          page: undefined
        }
      })
    },

    getNewsById(id: string): NewsItem | undefined {
      return this.items.find(item => item.id === id)
    },

    resetFilters() {
      const route = useRoute()
      const needReset =
        route.query.source ||
        route.query.search ||
        route.query.page;

      if (!needReset) return

      const router = useRouter()
      router.push({ query: {} })
    },

    setView(view: NewsViewMode) {
      if (this.view === view) return
      this.view = view
      if (import.meta.client) {
        localStorage.setItem('newsView', view)
      }
    },

    initClientSide() {
      if (import.meta.client && typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('newsView')
        if (saved === 'grid' || saved === 'list') {
          this.view = saved
        }
      }
    },
  },

  getters: {
    currentPage(): number {
      const route = useRoute()
      return Number(route.query.page) || 1
    },

    totalPages(): number {
      return Math.ceil(this.totalItems / PAGINATION_LIMIT)
    },

    visiblePages(): (number | string)[] {
      const { calculateVisiblePages } = useNewsPagination(
        this.currentPage,
        this.totalPages
      )
      return calculateVisiblePages()
    },

    isFirstPage(): boolean {
      return this.currentPage === 1
    },

    isLastPage(): boolean {
      return this.currentPage >= this.totalPages
    },
  }
})
