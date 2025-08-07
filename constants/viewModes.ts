import type { Component } from 'vue'
import GridIcon from '~/assets/icons/grid-view.svg'
import ListIcon from '~/assets/icons/list-view.svg'

export type ViewMode = 'grid' | 'list'

export interface ViewModeConfig {
  id: ViewMode
  icon: Component | string
  label: string
}

export const DEFAULT_VIEW_MODES: ViewModeConfig[] = [
  {
    id: 'grid',
    icon: GridIcon,
    label: 'Grid view'
  },
  {
    id: 'list',
    icon: ListIcon,
    label: 'List view'
  }
]
