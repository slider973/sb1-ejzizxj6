import { useState, useCallback } from "react"
import { DEFAULT_PRICE_RANGE } from "../constants"
import type { FilterState, GiftItem } from "../types"

const initialFilters: FilterState = {
  category: "all",
  priority: "all",
  status: "all",
  priceRange: DEFAULT_PRICE_RANGE
}

export function useGiftFilters(items: GiftItem[] = []) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const filteredItems = items.filter(item => {
    if (filters.category !== "all" && item.category !== filters.category) return false
    if (filters.priority !== "all" && item.priority !== filters.priority) return false
    if (filters.status === "purchased" && !item.purchased) return false
    if (filters.status === "available" && item.purchased) return false
    if (item.price && (
      item.price < filters.priceRange[0] || 
      item.price > filters.priceRange[1]
    )) return false
    return true
  })

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  return {
    filters,
    filteredItems,
    updateFilters,
    resetFilters
  }
}