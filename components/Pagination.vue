<script setup lang="ts">
const store = useNewsStore();

const handlePageChange = (page: number) => {
  store.goToPage(page);
};
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
      @click="handlePageChange(store.pagination.page - 1)"
      aria-label="Предыдущая страница"
    >
      ← Назад
    </button>

    <template v-for="(item, index) in store.visiblePages" :key="`page-${index}-${item}`">
      <button
        v-if="typeof item === 'number'"
        class="pagination-button"
        :class="{ active: item === store.pagination.page }"
        :disabled="store.isLoading"
        @click="handlePageChange(item)"
        :aria-label="`Страница ${item}`"
        :aria-current="item === store.pagination.page ? 'page' : undefined"
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
      @click="handlePageChange(store.pagination.page + 1)"
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
  margin-bottom: 20px;
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
</style>
