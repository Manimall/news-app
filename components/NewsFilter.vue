<script setup lang="ts">
import type { FilterSource } from '~/types/news'

const store = useNewsStore()
const route = useRoute()

interface FilterOption {
  value: FilterSource
  label: string
}

const filters: FilterOption[] = [
  { value: 'all', label: 'Все' },
  { value: 'mos', label: 'Mos.ru' },
  { value: 'lenta', label: 'Lenta.ru' },
  { value: 'ria', label: 'ria.ru' },
]

const emit = defineEmits(['update:modelValue'])

const activeFilter = computed<FilterSource>({
  get: () => (route.query.source as FilterSource) || 'all',
  set: (value: FilterSource) => store.updateSourceFilter(value)
})

</script>

<template>
  <nav class="filters" role="group" aria-label="Фильтры новостей">
    <button
      v-for="filter in filters"
      :key="filter.value"
      :class="{ active: activeFilter === filter.value }"
      @click="activeFilter = filter.value"
      :aria-pressed="activeFilter === filter.value"
      :aria-label="`Показать ${filter.label}`"
    >
      {{ filter.label }}
    </button>
  </nav>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 12px;
}

button {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  border-color: #2563eb;
}

button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
</style>
