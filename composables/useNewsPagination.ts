import type { Ref } from 'vue'

export const useNewsPagination = (
  currentPage: Ref<number> | number,
  totalPages: Ref<number> | number,
  range = 2,
  showAllThreshold = 7
) => {
  const calculateVisiblePages = (): (number | string)[] => {
    const current = unref(currentPage)
    const total = unref(totalPages)

    if (total === 0) return []
    if (total <= showAllThreshold) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages = new Set<number>([1, total])
    const start = Math.max(2, current - range)
    const end = Math.min(total - 1, current + range)

    for (let i = start; i <= end; i++) {
      pages.add(i)
    }

    const sorted = Array.from(pages).sort((a, b) => a - b)
    const result: (number | string)[] = []
    let prev = 0

    for (const page of sorted) {
      if (page > prev + 1) {
        result.push('...')
      }
      result.push(page)
      prev = page
    }

    return result
  }

  return {
    calculateVisiblePages
  }
}
