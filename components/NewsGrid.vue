<script setup lang="ts">
import type { NewsItem } from '~/types/news'

defineProps<{
  items: NewsItem[]
}>()
</script>

<template>
  <div class="news-grid">
    <NewsCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      mode="grid"
      class="grid-item"
    />
  </div>
</template>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 0;
}
</style>
