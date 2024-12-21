import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "@/contexts/AuthContext"
import { createGiftList } from "@/lib/gifts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FormData {
  title: string
  description: string
  occasion: string
  childName: string
  age: number
  interests: string
  clothesSize: string
  shoesSize: string
}

export function CreateGiftListDialog({ open, onOpenChange }: { 
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (!user) return
    setLoading(true)

    try {
      await createGiftList({
        title: data.title,
        description: data.description || null,
        occasion: data.occasion,
        created_by: user.id,
        child_name: data.childName,
        age: Number(data.age),
        interests: data.interests.split(',').map(i => i.trim()),
        size_info: {
          clothes: data.clothesSize,
          shoes: data.shoesSize
        }
      })
      
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating gift list:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Child's Gift List</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">List Title</Label>
              <Input 
                id="title" 
                {...register("title", { required: true })} 
                placeholder="Birthday Wishlist"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occasion">Occasion</Label>
              <Input 
                id="occasion" 
                {...register("occasion", { required: true })}
                placeholder="Birthday, Christmas, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name</Label>
              <Input 
                id="childName" 
                {...register("childName", { required: true })}
                placeholder="Child's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                {...register("age", { required: true, min: 0, max: 18 })}
                placeholder="Child's age"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests & Hobbies</Label>
            <Input 
              id="interests" 
              {...register("interests")}
              placeholder="Reading, Drawing, Sports (comma separated)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clothesSize">Clothes Size</Label>
              <Input 
                id="clothesSize" 
                {...register("clothesSize")}
                placeholder="6Y, S, M, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shoesSize">Shoes Size</Label>
              <Input 
                id="shoesSize" 
                {...register("shoesSize")}
                placeholder="EU 32, UK 13, etc."
              />
            </div>
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
              {loading ? "Creating..." : "Create List"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}