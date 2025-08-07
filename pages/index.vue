<script setup lang="ts">
import NewsGrid from '~/components/NewsGrid.vue'
import NewsList from '~/components/NewsList.vue'
import Pagination from '~/components/Pagination.vue'
import { useNewsStore } from '~/stores/news'
import { debounce } from '~/utils/debounce'

const route = useRoute()
const router = useRouter()
const store = useNewsStore()

const { error: fetchError } = await useAsyncData(
  'news',
  async () => {
    await store.fetchNews()
    return {}
  },
  {
    watch: [
      () => route.query.page,
      () => route.query.search,
      () => route.query.source
    ]
  }
)

// Дебаунс-поиск
const applySearch = async (value: string) => {
  if (route.query.search === value) return;

  await router.push({
    query: {
      ...route.query,
      search: value || undefined,
      page: undefined,
    }
  })
}

const searchQuery = computed({
  get: () => route.query.search?.toString() || '',
  set: debounce((value: string) => {
    applySearch(value)
  }, 500),
})
</script>

<template>
  <div class="container">
    <header class="news-header">
      <h2 class="news-title">Список новостей</h2>
      <ResetFilters />
      <NewsSearch v-model="searchQuery" :loading="store.isLoading" />
    </header>

    <main class="news-content">
      <div class="controls-row">
        <NewsFilter
          :modelValue="route.query.source || 'all'"
          @update:modelValue="(value) => store.updateSourceFilter(value)"
          :disabled="store.isLoading"
        />

        <ClientOnly>
          <ViewSwitcher
            :current="store.view"
            @change="(mode) => store.setView(mode)"
            class="view-switcher"
            :disabled="store.isLoading"
          />
        </ClientOnly>
      </div>

      <ClientOnly>
        <template v-if="store.isLoading">
          <div class="loading-spinner">Загрузка...</div>
        </template>

        <template v-else-if="store.error || fetchError">
          <div class="error-message">
            {{ store.error }}
            <button @click="store.fetchNews" class="retry-button">Повторить</button>
          </div>
        </template>

        <template v-else-if="store.items.length === 0">
          <div class="empty-message">Новости не найдены</div>
        </template>

        <template v-else>
          <component
            :is="store.view === 'grid' ? NewsGrid : NewsList"
            :items="store.items"
            :key="`${store.view}-${route.query.page || 1}-${route.query.search || ''}-${route.query.source || 'all'}`"
          />
          <Pagination />
        </template>
      </ClientOnly>
    </main>
  </div>
</template>

<style scoped>
.news-header {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
  gap: 16px;
  white-space: nowrap;
}

.error-message {
  padding: 20px;
  background: #ffeeee;
  color: #ff4444;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.retry-button {
  padding: 8px 16px;
  background: #00dc82;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loading-spinner {
  text-align: center;
  padding: 40px;
  color: #666;
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

@media (max-width: 767px) {
  .news-header {
    flex-wrap: wrap;
    gap: 12px;
    padding-bottom: 30px;
  }

  .news-title {
    font-size: 24px;
    margin-right: 0;
  }

  .news-header > :not(.news-title):not(.news-search) {
    margin-left: 0;
    margin-right: auto;
  }

  .controls-row {
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
  }

  .news-content {
    margin-top: 20px;
  }
}

@media (max-width: 500px) {
  .news-header > :not(.news-title):not(.news-search) {
    margin-left: auto;
    margin-right: 0;
  }

  .view-switcher {
    margin-left: 0;
  }
}
</style>
