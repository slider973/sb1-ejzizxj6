import { Badge } from "@/components/ui/badge"
import type { FilterState } from "../types"

interface GiftFilterBadgesProps {
  filters: FilterState
  itemCount: number
}

export function GiftFilterBadges({ filters, itemCount }: GiftFilterBadgesProps) {
  return (
    <div className="space-x-2">
      <Badge variant="outline">
        {itemCount} items
      </Badge>
      {filters.category !== "all" && (
        <Badge variant="secondary" className="capitalize">
          {filters.category}
        </Badge>
      )}
      {filters.priority !== "all" && (
        <Badge variant="secondary" className="capitalize">
          {filters.priority} priority
        </Badge>
      )}
    </div>
  )
}