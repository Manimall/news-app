<script setup lang="ts">
import { generateSourceFilters } from '~/constants/newsSources'
import type { FilterSource } from '~/types/news'

const route = useRoute()

const filters = generateSourceFilters();

const emit = defineEmits(['update:modelValue'])

const activeFilter = computed({
  get: () => (route.query.source as FilterSource) || 'all',
  set: (value) => emit('update:modelValue', value)
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
