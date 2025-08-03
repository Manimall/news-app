<!-- components/PlaceholderImage.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  width?: number
  height?: number
  text?: string
}>(), {
  width: 16,
  height: 9,
  text: 'No Image'
})

const realWidth = computed(() => props.width * 50)
const realHeight = computed(() => props.height * 50)
</script>

<template>
  <svg
    class="placeholder-image"
    :width="realWidth"
    :height="realHeight"
    :viewBox="`0 0 ${realWidth} ${realHeight}`"
  >
    <rect width="100%" height="100%" fill="#f5f5f5" />
    <text
      x="50%"
      y="50%"
      font-family="system-ui, sans-serif"
      font-size="32"
      fill="#999"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      {{ text }}
    </text>
  </svg>
</template>

<style scoped>
.placeholder-image {
  display: block;
  background-color: #f5f5f5;
}
</style>
