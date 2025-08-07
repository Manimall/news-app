<script setup lang="ts">
import { DEFAULT_VIEW_MODES, type ViewMode } from '~/constants/viewModes';

const props = defineProps<{
  current: ViewMode
  disabled?: boolean
}>()

const emit = defineEmits(['change'])

const views = DEFAULT_VIEW_MODES

</script>

<template>
  <div class="view-switcher-container">
    <button
      v-for="view in views"
      :key="view.id"
      class="view-button"
      :class="{ active: props.current === view.id }"
      @click="emit('change', view.id)"
      :disabled="disabled"
      :aria-label="view.label"
    >
      <component :is="view.icon" class="icon" />
    </button>
  </div>
</template>

<style scoped>
.view-switcher-container {
  display: flex;
  gap: 8px;
  background: transparent;
  padding: 4px;
  border-radius: 8px;
}

.view-button {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.view-button .icon {
  width: 20px;
  height: 20px;
  display: block;
  color: #94a3b8;
}

.view-button.active .icon {
  color: #2563eb;
}

.view-button:hover:not(.active) .icon {
  color: #64748b;
}
</style>
