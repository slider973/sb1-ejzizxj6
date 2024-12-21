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

interface GiftFiltersProps {
  filters: {
    category: string
    priority: string
    status: string
    priceRange: [number, number]
  }
  onFiltersChange: (filters: any) => void
}

export function GiftFilters({ filters, onFiltersChange }: GiftFiltersProps) {
  const categories = ["all", "toys", "clothes", "books", "electronics", "other"]
  const priorities = ["all", "high", "medium", "low"]
  const statuses = ["all", "available", "purchased"]

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
        {categories.map((category) => (
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
        {priorities.map((priority) => (
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
        {statuses.map((status) => (
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