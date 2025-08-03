<script setup lang="ts">
import GridIcon from '~/assets/icons/grid-view.svg'
import ListIcon from '~/assets/icons/list-view.svg'

const props = defineProps<{
  current: 'grid' | 'list'
}>()

const emit = defineEmits(['change'])

const views = [
  { id: 'grid' as const, icon: GridIcon, label: 'Grid view' },
  { id: 'list' as const, icon: ListIcon, label: 'List view' }
]

</script>

<template>
  <div class="view-switcher-container">
    <button
      v-for="view in views"
      :key="view.id"
      class="view-button"
      :class="{ active: props.current === view.id }"
      @click="emit('change', view.id)"
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
