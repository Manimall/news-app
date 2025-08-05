import { defineStore } from 'pinia'
import type {
  NewsItem,
  NewsViewMode,
  NewsFilters,
  NewsPagination,
  FilterSource
} from '~/types/news'

interface NewsState {
  items: NewsItem[]
  view: NewsViewMode
  filters: NewsFilters
  pagination: NewsPagination
  isLoading: boolean
  error: string | null
}

export const useNewsStore = defineStore('news', {
  state: (): NewsState => ({
    items: [],
    view: 'grid',
    filters: {
      source: 'all',
      search: ''
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    },
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchNews() {
      try {
        if (this.isLoading) return

        this.isLoading = true
        this.error = null

        const { fetchNews } = useFetchNews()
        const { data, error } = await fetchNews(this.filters, this.pagination)

        if (error.value) throw new Error(error.value.message)

        this.items = data?.data || []
        this.pagination.total = data?.total || 0
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch news'
      } finally {
        this.isLoading = false
      }
    },

    async goToPage(page: number) {
      if (
        page === this.pagination.page ||
        page < 1 ||
        page > this.totalPages
      ) return

      this.pagination.page = page
      const router = useRouter()

      await router.push({
        query: {
          ...router.currentRoute.value.query,
          page: page > 1 ? page : undefined
        }
      })

      if (import.meta.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },

    async syncWithRoute() {
      const route = useRoute()
      this.pagination.page = Number(route.query.page) || 1
      this.filters.source = (route.query.source as FilterSource) || 'all'
      this.filters.search = route.query.search?.toString() || ''
    },

    updateSourceFilter(source: FilterSource) {
      if (this.filters.source === source) return

      this.filters.source = source
      this.pagination.page = 1

      const router = useRouter()
      router.push({
        query: {
          ...router.currentRoute.value.query,
          source,
          page: undefined
        }
      })
    },

    getNewsById(id: string): NewsItem | undefined {
      return this.items.find(item => item.id === id)
    },

    resetFilters() {
      const needReset =
        this.filters.source !== 'all' ||
        this.filters.search ||
        this.pagination.page !== 1;

      if (!needReset) return;

      this.$patch({
        filters: { source: 'all', search: '' },
        pagination: { ...this.pagination, page: 1 }
      })

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
    totalPages(): number {
      return Math.ceil(this.pagination.total / this.pagination.limit);
    },

    visiblePages(): (number | string)[] {
      const { calculateVisiblePages } = useNewsPagination(
        this.pagination.page,
        this.totalPages
      )
      return calculateVisiblePages()
    },

    isFirstPage(): boolean {
      return this.pagination.page === 1;
    },

    isLastPage(): boolean {
      return this.pagination.page >= this.totalPages;
    },
  }
})
