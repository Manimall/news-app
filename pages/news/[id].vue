<script setup lang="ts">
import { useNewsStore } from '~/stores/news'
import { formatDate } from '~/utils/date'

const route = useRoute()
const { id } = route.params
const store = useNewsStore()

const newsItem = computed(() => store.getNewsById(id as string))

onMounted(async () => {
  if (!newsItem.value && store.items.length === 0) {
    await store.fetchNews()
  }
})

useHead({
  title: newsItem.value?.title || 'Новость не найдена',
  meta: [
    {
      name: 'description',
      content: newsItem.value?.content?.substring(0, 160) || 'Страница новости'
    }
  ]
})
</script>

<template>
  <div class="news-detail">
    <div v-if="!newsItem" class="not-found">
      <h1>Новость не найдена</h1>
      <NuxtLink to="/">← Вернуться к списку новостей</NuxtLink>
    </div>

    <article v-else class="news-article">
      <header>
        <span class="source">{{ newsItem.source.toUpperCase() }}</span>
        <time :datetime="newsItem.date">{{ formatDate(newsItem.date) }}</time>
        <h1>{{ newsItem.title }}</h1>
      </header>

      <div class="content" v-html="newsItem.content"></div>

      <footer>
        <NuxtLink to="/">← Все новости</NuxtLink>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.not-found {
  text-align: center;
  padding: 40px 0;
}
.news-article {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
header {
  margin-bottom: 20px;
}
.source {
  font-weight: bold;
  color: #666;
}
time {
  color: #666;
  font-size: 0.9em;
  display: block;
  margin: 5px 0;
}
h1 {
  font-size: 2em;
  margin: 10px 0;
}
.content {
  line-height: 1.6;
}
.content :deep(img) {
  max-width: 100%;
  height: auto;
}
footer {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
</style>
