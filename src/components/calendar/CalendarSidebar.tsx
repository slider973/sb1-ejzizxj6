import { useEffect, useState } from "react"
import { format, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getMonthEvents } from "@/lib/events"
import type { FamilyEvent } from "@/types/event"

interface CalendarSidebarProps {
  currentDate: Date
}

export function CalendarSidebar({ currentDate }: CalendarSidebarProps) {
  const [events, setEvents] = useState<FamilyEvent[]>([])

  useEffect(() => {
    async function loadEvents() {
      try {
        const monthEvents = await getMonthEvents(currentDate, currentDate)
        setEvents(monthEvents)
      } catch (error) {
        console.error("Error loading events:", error)
      }
    }

    loadEvents()
  }, [currentDate])

  const todayEvents = events.filter(event => 
    isSameDay(new Date(event.start_date), currentDate)
  )

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Today's Events</CardTitle>
      </CardHeader>
      <CardContent>
        {todayEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No events today</p>
        ) : (
          <div className="space-y-4">
            {todayEvents.map(event => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary"
              >
                <CalendarIcon className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.start_date), "p")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}