<script setup lang="ts">
import type { NewsItem } from '~/types/news'
import { getSourceUrl } from '~/constants/newsSources'

defineProps<{
  item: NewsItem
}>()
</script>

<template>
  <div class="card-content">
    <h3 class="news-title">{{ item.title }}</h3>
    <div class="news-content" v-html="item.content"/>

    <a
      :href="item.id"
      class="news-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Подробнее
    </a>

    <div class="news-meta">
      <a
        :href="getSourceUrl(item.source)"
        class="source-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.source }}
      </a>
      <time class="news-date">{{ new Date(item.date).toLocaleDateString() }}</time>
    </div>
  </div>
</template>

<style scoped>
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
}

.news-title {
  margin: 0 0 4px 0;
  font-family: Arial;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0;
  color: #0029FF;
  overflow: hidden;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #DCDCDC;
  font-family: Arial;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  margin-top: auto;
}

.source-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: #2563eb;
}

.news-content {
  font-family: Arial;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  box-orient: vertical;
  overflow: hidden;
  color: #000000;
  margin-bottom: 8px;
}

.news-link {
  color: #0029FF;
  text-decoration: none;
  font-weight: 500;
  align-self: flex-start;
  font-family: Arial;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  padding: 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;

}

.news-link:hover {
  border-bottom-color: currentColor;
}
</style>
