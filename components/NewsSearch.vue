<script setup lang="ts">
import SearchIcon from '~/assets/icons/search.svg'

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue', 'search'])
</script>

<template>
  <div class="news-search">
    <div class="search-input-container">
      <input
        :value="modelValue"
        class="search-input"
        placeholder="Поиск новостей..."
        type="search"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <button class="search-button" @click="$emit('search')">
        <SearchIcon class="search-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.news-search {
  width: 100%;
  max-width: 450px;
  margin-left: auto;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  padding-right: 50px;
  border: 2px solid #ffffff;
  font-size: 16px;
  background: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 2px rgb(53 172 247 / 30%);
}

.search-button {
  position: absolute;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #64748b;
  transition: color 0.2s ease;
}

.search-input:focus + .search-button .search-icon {
  color: #0029FF;
}

@media (max-width: 767px) {
  .news-search {
    width: 100%;
    order: 1;
    margin-left: 0;
  }

  .search-input {
    padding: 10px 15px;
    padding-right: 45px;
    font-size: 14px;
  }
}

@media (max-width: 500px) {
  .news-search {
    max-width: 100%;
  }
}
</style>
