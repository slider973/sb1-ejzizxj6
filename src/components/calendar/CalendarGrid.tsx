import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth } from "date-fns"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getMonthEvents } from "@/lib/events"
import { cn } from "@/lib/utils"
import type { FamilyEvent } from "@/types/event"

interface CalendarGridProps {
  currentDate: Date
}

export function CalendarGrid({ currentDate }: CalendarGridProps) {
  const { user } = useAuth()
  const [events, setEvents] = useState<FamilyEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      if (!user) return
      
      try {
        const monthEvents = await getMonthEvents(
          startOfMonth(currentDate),
          endOfMonth(currentDate)
        )
        setEvents(monthEvents)
      } catch (error) {
        console.error("Error loading events:", error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [currentDate, user])

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="bg-muted-foreground/5 p-3 text-center text-sm font-medium"
        >
          {day}
        </div>
      ))}
      
      {days.map((day) => {
        const dayEvents = events.filter(event => 
          format(new Date(event.start_date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
        )
        
        return (
          <div
            key={day.toString()}
            className={cn(
              "min-h-[120px] p-2 bg-card transition-colors",
              !isSameMonth(day, currentDate) && "bg-muted-foreground/5 text-muted-foreground"
            )}
          >
            <span className="text-sm font-medium">{format(day, "d")}</span>
            
            <div className="mt-1 space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="text-xs p-1 rounded bg-primary/10 text-primary line-clamp-1"
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}