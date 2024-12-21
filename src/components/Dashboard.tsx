import { useState, useEffect } from "react"
import { DashboardHeader } from "./dashboard/DashboardHeader"
import { DashboardGrid } from "./dashboard/DashboardGrid"
import { UpcomingEvents } from "./dashboard/sections/UpcomingEvents"
import { TaskOverview } from "./dashboard/sections/TaskOverview"
import { useAuth } from "@/contexts/AuthContext"
import { getMonthEvents } from "@/lib/events"
import { getUserTasks } from "@/lib/tasks"

export function Dashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return

      try {
        const [monthEvents, userTasks] = await Promise.all([
          getMonthEvents(new Date(), new Date()),
          getUserTasks(user.id)
        ])

        setEvents(monthEvents)
        setTasks(userTasks)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DashboardHeader title="Welcome Back" />
      <DashboardGrid>
        <TaskOverview tasks={tasks} />
        <UpcomingEvents events={events} />
      </DashboardGrid>
    </div>
  )
}