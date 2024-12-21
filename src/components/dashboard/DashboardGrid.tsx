import { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface DashboardGridProps {
  children: ReactNode
}

export function DashboardGrid({ children }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  )
}