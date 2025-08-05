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
  { value: 'ria', label: 'Ria.ru' },
]

const emit = defineEmits(['update:modelValue'])

const activeFilter = computed<FilterSource>({
  get: () => (route.query.source as FilterSource) || 'all',
  set: (value: FilterSource) => store.updateSourceFilter(value)
})
</script>

<template>
  <nav class="filters" aria-label="Фильтры новостей">
    <ul class="filters-list">
      <li v-for="filter in filters" :key="filter.value">
        <button
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
          :aria-pressed="activeFilter === filter.value"
          :aria-label="`Показать ${filter.label}`"
        >
          {{ filter.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.filters {
  display: flex;
  flex: 1 0 auto;
}

.filters-list {
  display: flex;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  padding: 8px 6px;
  border: none;
  background: transparent;
  color: #0029FF;
  font-family: Arial;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

button:hover:not(.active) {
  color: #000000;
  transform: translateY(-1px);
}

button.active {
  color: #000000;
  cursor: default;
  pointer-events: none;
}
</style>
