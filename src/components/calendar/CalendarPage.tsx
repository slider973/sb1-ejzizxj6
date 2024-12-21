import { useState } from "react"
import { DashboardHeader } from "../dashboard/DashboardHeader"
import { CalendarView } from "./CalendarView"
import { CreateEventDialog } from "./CreateEventDialog"

export function CalendarPage() {
  const [showCreateEvent, setShowCreateEvent] = useState(false)

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="Calendar" 
        onCreateNew={() => setShowCreateEvent(true)}
        createButtonText="New Event"
      />
      
      <div className="bg-white/60 backdrop-blur-xl rounded-xl border shadow-sm p-6">
        <CalendarView />
      </div>

      <CreateEventDialog 
        open={showCreateEvent} 
        onOpenChange={setShowCreateEvent}
      />
    </div>
  )
}