import { defineStore } from 'pinia'
import type {
  NewsItem,
  NewsViewMode,
  NewsFilters,
  NewsPagination,
  FilterSource
} from '~/types/news'
import { useLocalStorage } from '@vueuse/core'

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
    view: 'grid' as NewsViewMode,
    filters: {
      source: 'all',
      search: ''
    },
    pagination: {
      page: 1,
      limit: 10
    },
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchNews() {
      try {
        this.isLoading = true
        this.error = null

        const route = useRoute()
        const source = (route.query.source as FilterSource) || 'all'

        const { data, error } = await useFetch('/api/news', {
          key: `news-${source}`,
          query: { source }
        })

        if (error.value) {
          throw new Error(error.value.message)
        }

        this.items = data.value || []
        this.filters.source = source
        this.pagination.page = 1
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch news'
        console.error('Error fetching news:', err)
      } finally {
        this.isLoading = false
      }
    },

    updateSourceFilter(source: FilterSource) {
      const route = useRoute()
      const router = useRouter()
      router.push({
        query: {
          ...route.query,
          source,
          page: 1
        }
      })
      this.filters.source = source
      this.pagination.page = 1
    },

    resetFilters() {
      this.filters.source = 'all'
      this.filters.search = ''
      this.pagination.page = 1
    },

    setView(view: NewsViewMode) {
      this.view = view
      localStorage.setItem('newsView', view)
    },

    initClientSide() {
      if (import.meta.client) {
        const saved = localStorage.getItem('newsView')
        if (saved === 'grid' || saved === 'list') {
          this.view = saved
        }
      }
    },

    setPage(page: number) {
      this.pagination.page = page
    },

    getNewsById(id: string): NewsItem | undefined {
      return this.items.find(item => item.id === id)
    },

    hydrate(state: NewsState) {
      // Восстанавливаем из localStorage при гидратации
      state.view = (localStorage.getItem('newsView') as NewsViewMode) || 'grid'
    }
  },

  getters: {
    filteredNews(state): NewsItem[] {
      if (!state.filters.search) {
        return state.items.filter(item =>
          state.filters.source === 'all' || item.source === state.filters.source
        )
      }

      const searchTerm = state.filters.search.toLowerCase()
      return state.items.filter(item => {
        const matchesSource = state.filters.source === 'all' || item.source === state.filters.source
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm) ||
          item.content.toLowerCase().includes(searchTerm)
        return matchesSource && matchesSearch
      })
    },

    paginatedNews(): NewsItem[] {
      const start = (this.pagination.page - 1) * this.pagination.limit
      return this.filteredNews.slice(start, start + this.pagination.limit)
    },

    totalPages(): number {
      return Math.ceil(this.filteredNews.length / this.pagination.limit)
    }
  }
})
