<script setup lang="ts">
import NewsGrid from '~/components/NewsGrid.vue'
import NewsList from '~/components/NewsList.vue'
import { useNewsStore } from '~/stores/news'
import type { FilterSource } from '~/types/news'
import { debounce } from '~/utils/debounce'

const route = useRoute()
const router = useRouter()
const store = useNewsStore()
const searchQuery = ref(route.query.search?.toString() || '')

// Инициализация
onMounted(async () => {
  store.initClientSide()
  await syncStoreWithRoute()
  await store.fetchNews()
})

// Синхронизация с URL
const syncStoreWithRoute = () => {
  store.filters.source = (route.query.source as FilterSource) || 'all'
  store.filters.search = route.query.search?.toString() || ''
  store.pagination.page = Number(route.query.page) || 1
  searchQuery.value = store.filters.search
}

// Поиск с debounce
const applySearch = debounce((query: string) => {
  store.filters.search = query
  router.push({
    query: {
      ...route.query,
      search: query || undefined,
      page: 1
    }
  })
}, 300)

// Реакция на ввод
watch(searchQuery, (newVal) => {
  applySearch(newVal)
})

watch(
  () => route.query,
  async () => {
    await syncStoreWithRoute()
    await store.fetchNews()
  },
  { deep: true }
)
</script>

<template>
  <div class="container">
    <header class="news-header">
      <h2 class="news-title">Список новостей</h2>
      <ResetFilters />

      <NewsSearch v-model="searchQuery" />
    </header>

    <main class="news-content">
      <div class="controls-row">
        <NewsFilter v-model="store.filters.source" />

        <!-- add preloader -->
        <ClientOnly>
          <ViewSwitcher
            :current="store.view"
            @change="(mode) => store.setView(mode)"
            class="view-switcher"
          />
        </ClientOnly>
      </div>

      <ClientOnly>
        <component
          :is="store.view === 'grid' ? NewsGrid : NewsList"
          :items="store.paginatedNews"
        />
      </ClientOnly>
    </main>
  </div>
</template>

<style scoped>
.news-header {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #E5E5E5;
  gap: 16px;
}
.news-title {
  margin: 0;
  font-family: Arial;
  font-weight: 700;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: 0;

}
.news-content {
  margin-top: 30px;
}
.controls-row {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  min-height: 40px;
}
.view-switcher {
  margin-left: auto;
}
</style>
