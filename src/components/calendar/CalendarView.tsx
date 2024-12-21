import { useState } from "react"
import { format } from "date-fns"
import { CalendarHeader } from "./CalendarHeader"
import { CalendarGrid } from "./CalendarGrid"
import { CalendarSidebar } from "./CalendarSidebar"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <CalendarHeader 
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        <CalendarGrid currentDate={currentDate} />
      </div>
      <CalendarSidebar currentDate={currentDate} />
    </div>
  )
}