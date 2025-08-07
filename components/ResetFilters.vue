<script setup lang="ts">
import ResetIcon from '~/assets/icons/reset.svg'
import { useNewsStore } from '~/stores/news'

const store = useNewsStore()

const handleReset = async () => {
  await store.resetFilters()
}

const isDisabled = computed(() => {
  const route = useRoute()
  return (
    (!route.query.source || route.query.source === 'all') &&
    !route.query.search &&
    (!route.query.page || route.query.page === '1')
  ) || store.isLoading
})
</script>

<template>
  <button
    class="reset-filters-button"
    @click="handleReset"
    aria-label="Сбросить фильтры"
    :disabled="isDisabled"
  >
    <ResetIcon class="reset-icon" :class="{ 'animate-spin': store.isLoading }" />
    <span class="visually-hidden">Сбросить всё</span>
  </button>
</template>

<style scoped>
.reset-filters-button {
  display: flex;
  align-items: center;
  padding: 11px 9px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.reset-filters-button:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.reset-filters-button:active:not(:disabled) {
  background: #f1f5f9;
}

.reset-filters-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-icon {
  width: 20px;
  height: 16px;
  color: #64748b;
  transition: color 0.2s ease;
}

.reset-filters-button:hover:not(:disabled) .reset-icon {
  color: #475569;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
