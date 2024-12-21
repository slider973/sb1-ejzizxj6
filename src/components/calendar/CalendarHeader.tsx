import { format, addMonths, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarHeaderProps {
  currentDate: Date
  onDateChange: (date: Date) => void
}

export function CalendarHeader({ currentDate, onDateChange }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDateChange(subMonths(currentDate, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDateChange(addMonths(currentDate, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}