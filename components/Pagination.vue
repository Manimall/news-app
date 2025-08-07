<script setup lang="ts">
const store = useNewsStore();
const route = useRoute();

const { goToPage } = usePagination()

const handlePageChange = (page: number) => {
  if (!store.isLoading) {
    goToPage(page, store.totalPages)
  }
}

const currentPage = computed(() => Number(route.query.page) || 1);
</script>

<template>
  <nav
    v-if="store.totalPages > 1"
    class="pagination"
    aria-label="Навигация по страницам"
  >
    <button
      class="pagination-button pagination-button--nav"
      :disabled="store.isFirstPage || store.isLoading"
      @click="handlePageChange(currentPage - 1)"
      aria-label="Предыдущая страница"
    >
      ← Назад
    </button>

    <template v-for="(item, index) in store.visiblePages" :key="`page-${index}-${item}`">
      <button
        v-if="typeof item === 'number'"
        class="pagination-button"
        :class="{ active: item === currentPage }"
        :disabled="store.isLoading"
        @click="handlePageChange(item)"
        :aria-label="`Страница ${item}`"
        :aria-current="item === currentPage ? 'page' : undefined"
      >
        {{ item }}
      </button>
      <span v-else class="pagination-separator">
        {{ item }}
      </span>
    </template>

    <button
      class="pagination-button pagination-button--nav"
      :disabled="store.isLastPage || store.isLoading"
      @click="handlePageChange(currentPage + 1)"
      aria-label="Следующая страница"
    >
      Вперед →
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.pagination-button {
  padding: 8px 4px;
  border: none;
  color: #000000;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 24px;
  font-family: Arial;
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
  user-select: none;
}

.pagination-button:hover:not(:disabled) {
  color: #0029FF;
}

.pagination-button.active {
  color: #0029FF;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-separator {
  padding: 0 8px;
  user-select: none;
}

.pagination-button--nav {
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
}

@media (max-width: 500px) {
  .pagination {
    gap: 3px;
    margin-bottom: 0px;
  }

  .pagination-button--nav {
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
  }
}
</style>
