import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import { DashboardSection } from "../DashboardSection"
import type { Task } from "@/types/task"

interface TaskOverviewProps {
  tasks: Task[]
}

export function TaskOverview({ tasks }: TaskOverviewProps) {
  const todoCount = tasks.filter((task) => task.status === "todo").length
  const inProgressCount = tasks.filter((task) => task.status === "in_progress").length
  const completedCount = tasks.filter((task) => task.status === "completed").length

  return (
    <DashboardSection title="Task Overview">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 rounded-lg bg-white/40">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-2xl font-semibold">{todoCount}</span>
          <span className="text-sm text-muted-foreground">To Do</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg bg-white/40">
          <Clock className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-2xl font-semibold">{inProgressCount}</span>
          <span className="text-sm text-muted-foreground">In Progress</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg bg-white/40">
          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-2xl font-semibold">{completedCount}</span>
          <span className="text-sm text-muted-foreground">Completed</span>
        </div>
      </div>
    </DashboardSection>
  )
}