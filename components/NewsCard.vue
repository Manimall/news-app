<script setup lang="ts">
import type { NewsItem } from '~/types/news'
import PlaceholderImage from './PlaceholderImage.vue'
import NewsCardContent from './NewsCardContent.vue'

defineProps<{
  item: NewsItem
  mode?: 'grid' | 'list'
}>()

const imageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  img.nextElementSibling?.classList.remove('hidden')
}
</script>

<template>
  <article :class="['news-card', `news-card--${mode}`]">
    <!-- List mode - горизонтальная раскладка -->
    <div v-if="mode === 'list'" class="news-list-container">
      <div class="image-wrapper">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          class="news-image"
          loading="lazy"
          @error="imageError"
        >
        <PlaceholderImage
          :class="['placeholder', { hidden: item.image }]"
          :width="4"
          :height="3"
        />
      </div>

      <NewsCardContent :item="item" />
    </div>

    <!-- Grid mode - вертикальная раскладка -->
    <template v-else>
      <div class="image-wrapper">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          class="news-image"
          loading="lazy"
          @error="imageError"
        >
        <PlaceholderImage
          :class="['placeholder', { hidden: item.image }]"
          :width="16"
          :height="9"
        />
      </div>

      <NewsCardContent :item="item" />
    </template>
  </article>
</template>

<style scoped>

/* Общие стили */
.news-card {
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hidden {
  display: none;
}

/* Стили для grid-режима */
.news-card--grid {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card--grid .image-wrapper {
  max-height: 215px;
}

/* Стили для list-режима */
.news-card--list .news-list-container {
  display: flex;
  gap: 16px;
}

.news-card--list .image-wrapper {
  width: 280px;
  aspect-ratio: 4/3;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .news-card--list .news-list-container {
    flex-direction: column;
  }

  .news-card--list .image-wrapper {
    width: 100%;
    aspect-ratio: 16/9;
  }
}
</style>
