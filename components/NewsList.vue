<script setup lang="ts">
import type { NewsItem } from '~/types/news'

defineProps<{
  items: NewsItem[]
}>()
</script>

<template>
  <div class="news-list">
    <NewsCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      mode="list"
    />
  </div>
</template>

<style scoped>
.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
