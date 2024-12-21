import { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface DashboardSectionProps {
  title: string
  children: ReactNode
}

export function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <Card className="bg-white/60 backdrop-blur-xl border-none shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}