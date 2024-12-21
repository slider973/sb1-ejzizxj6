import { useState } from "react"
import { useForm } from "react-hook-form"
import { addGiftItem } from "@/lib/gifts/operations"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CreateGiftItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listId: string
  childAge: number
}

interface FormData {
  title: string
  description: string
  url: string
  price: string
  priority: string
  category: string
  ageMin: string
  ageMax: string
}

export function CreateGiftItemDialog({
  open,
  onOpenChange,
  listId,
  childAge,
}: CreateGiftItemDialogProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      ageMin: String(Math.max(0, childAge - 1)),
      ageMax: String(childAge + 1)
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await addGiftItem({
        list_id: listId,
        title: data.title,
        description: data.description || null,
        url: data.url || null,
        price: data.price ? parseFloat(data.price) : null,
        priority: data.priority as 'high' | 'medium' | 'low',
        category: data.category as any,
        age_range: {
          min: parseInt(data.ageMin),
          max: parseInt(data.ageMax)
        }
      })
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating gift item:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Gift Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Gift name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Gift description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price")}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                onValueChange={(value) => register("priority").onChange({ target: { value } })}
                defaultValue="medium"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => register("category").onChange({ target: { value } })}
              defaultValue="toys"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toys">Toys</SelectItem>
                <SelectItem value="clothes">Clothes</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              {...register("url")}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ageMin">Minimum Age</Label>
              <Input
                id="ageMin"
                type="number"
                min="0"
                {...register("ageMin")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ageMax">Maximum Age</Label>
              <Input
                id="ageMax"
                type="number"
                min="0"
                {...register("ageMax")}
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
              {loading ? "Adding..." : "Add Gift"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}