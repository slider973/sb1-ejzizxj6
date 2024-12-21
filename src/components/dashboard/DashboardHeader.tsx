import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  title: string
  onCreateNew?: () => void
  createButtonText?: string
}

export function DashboardHeader({ title, onCreateNew, createButtonText }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {onCreateNew && (
        <Button onClick={onCreateNew} size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          {createButtonText || "Create New"}
        </Button>
      )}
    </div>
  )
}