import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { GIFT_CATEGORIES, GIFT_PRIORITIES, GIFT_STATUSES } from "../constants"
import type { FilterState } from "../types"

interface GiftFilterDropdownProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function GiftFilterDropdown({ filters, onFiltersChange }: GiftFilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        {GIFT_CATEGORIES.map((category) => (
          <DropdownMenuItem
            key={category}
            className="capitalize"
            onClick={() => onFiltersChange({ ...filters, category })}
          >
            {category}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Priority</DropdownMenuLabel>
        {GIFT_PRIORITIES.map((priority) => (
          <DropdownMenuItem
            key={priority}
            className="capitalize"
            onClick={() => onFiltersChange({ ...filters, priority })}
          >
            {priority}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {GIFT_STATUSES.map((status) => (
          <DropdownMenuItem
            key={status}
            className="capitalize"
            onClick={() => onFiltersChange({ ...filters, status })}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}