<script setup lang="ts">
const store = useNewsStore();

const handlePageChange = (page: number) => {
  store.goToPage(page);
};
</script>

<template>
  <div v-if="store.totalPages > 1" class="pagination">
    <button
      class="pagination-button"
      :disabled="store.pagination.page === 1 || store.isLoading"
      @click="handlePageChange(store.pagination.page - 1)"
    >
      ← Назад
    </button>

    <template v-for="item in store.visiblePages" :key="item">
      <button
        v-if="typeof item === 'number'"
        class="pagination-button"
        :class="{ active: item === store.pagination.page }"
        :disabled="store.isLoading"
        @click="handlePageChange(item)"
      >
        {{ item }}
      </button>
      <span v-else class="pagination-separator">
        {{ item }}
      </span>
    </template>

    <button
      class="pagination-button"
      :disabled="store.pagination.page >= store.totalPages || store.isLoading"
      @click="handlePageChange(store.pagination.page + 1)"
    >
      Вперед →
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.pagination-button {
  padding: 8px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;
}

.pagination-button:hover:not(:disabled) {
  background: #f5f5f5;
}

.pagination-button.active {
  background: #00dc82;
  color: white;
  border-color: #00dc82;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-separator {
  padding: 0 8px;
  user-select: none;
}
</style>
