<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['page-changed'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<template>
  <div class="pagination">
    <button
      v-if="currentPage > 1"
      @click="emit('page-changed', currentPage - 1)"
    >
      Previous
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="emit('page-changed', page)"
    >
      {{ page }}
    </button>

    <button
      v-if="currentPage < totalPages"
      @click="emit('page-changed', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
