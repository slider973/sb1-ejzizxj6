import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { DashboardSection } from "../DashboardSection"
import type { FamilyEvent } from "@/types/event"

interface UpcomingEventsProps {
  events: FamilyEvent[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <DashboardSection title="Upcoming Events">
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/40 hover:bg-white/60 transition-colors"
          >
            <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(event.start_date), "PPP")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardSection>
  )
}