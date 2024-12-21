import { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createEvent } from "@/lib/events"
import { useAuth } from "@/contexts/AuthContext"

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface EventFormData {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
}

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<EventFormData>()

  const onSubmit = async (data: EventFormData) => {
    if (!user) return
    setLoading(true)

    try {
      await createEvent({
        title: data.title,
        description: data.description || null,
        start_date: data.startDate,
        end_date: data.endDate || null,
        location: data.location || null,
        created_by: user.id
      })
      
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating event:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title", { required: true })} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register("description")} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                type="datetime-local" 
                {...register("startDate", { required: true })} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate" 
                type="datetime-local" 
                {...register("endDate")} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}