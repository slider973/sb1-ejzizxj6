import { GiftFilterBadges } from "./GiftFilterBadges"
import { GiftFilterDropdown } from "./GiftFilterDropdown"
import type { FilterState } from "../types"

interface GiftFiltersProps {
  filters: FilterState
  itemCount: number
  onFiltersChange: (filters: FilterState) => void
}

export function GiftFilters({ filters, itemCount, onFiltersChange }: GiftFiltersProps) {
  return (
    <div className="flex items-center justify-between">
      <GiftFilterBadges filters={filters} itemCount={itemCount} />
      <GiftFilterDropdown filters={filters} onFiltersChange={onFiltersChange} />
    </div>
  )
}