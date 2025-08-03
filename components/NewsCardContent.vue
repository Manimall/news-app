<script setup lang="ts">
import type { NewsItem } from '~/types/news'

defineProps<{
  item: NewsItem
}>()
</script>

<template>
  <div class="card-content">
    <h3 class="news-title">{{ item.title }}</h3>
    <div class="news-meta">
      <span class="news-source">{{ item.source }}</span>
      <time class="news-date">{{ new Date(item.date).toLocaleDateString() }}</time>
    </div>
    <div class="news-content" v-html="item.content"></div>
    <a
      :href="item.id"
      class="news-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read more
    </a>
  </div>
</template>

<style scoped>
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-title {
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  line-height: 1.4;
  display: -webkit-box;
  line-clamp: 2;
  box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  gap: 12px;
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.news-content {
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  line-clamp: 3;
  box-orient: vertical;
  overflow: hidden;
  color: #444;
}

.news-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
  align-self: flex-start;
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.news-link:hover {
  border-bottom-color: currentColor;
}
</style>
