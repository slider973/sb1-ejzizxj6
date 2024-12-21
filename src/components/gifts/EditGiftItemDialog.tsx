import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { updateGiftItem, deleteGiftItem } from "@/lib/gifts"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { GiftItem } from "@/types/gift"

interface EditGiftItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: GiftItem
  onUpdate: () => void
  onDelete: () => void
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

export function EditGiftItemDialog({
  open,
  onOpenChange,
  item,
  onUpdate,
  onDelete,
}: EditGiftItemDialogProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: item.title,
      description: item.description || "",
      url: item.url || "",
      price: item.price?.toString() || "",
      priority: item.priority,
      category: item.category,
      ageMin: item.age_range?.min.toString() || "",
      ageMax: item.age_range?.max.toString() || "",
    }
  })

  const handleUpdate = async (data: FormData) => {
    setLoading(true)
    try {
      await updateGiftItem(item.id, {
        title: data.title,
        description: data.description || null,
        url: data.url || null,
        price: data.price ? parseFloat(data.price) : null,
        priority: data.priority as GiftItem["priority"],
        category: data.category as GiftItem["category"],
        age_range: data.ageMin && data.ageMax ? {
          min: parseInt(data.ageMin),
          max: parseInt(data.ageMax)
        } : null
      })
      onUpdate()
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating gift item:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteGiftItem(item.id)
      onDelete()
      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting gift item:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier le cadeau</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select
                onValueChange={(value) => register("priority").onChange({ target: { value } })}
                defaultValue={item.priority}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              onValueChange={(value) => register("category").onChange({ target: { value } })}
              defaultValue={item.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toys">Jouets</SelectItem>
                <SelectItem value="clothes">Vêtements</SelectItem>
                <SelectItem value="books">Livres</SelectItem>
                <SelectItem value="electronics">Électronique</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              {...register("url")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ageMin">Âge minimum</Label>
              <Input
                id="ageMin"
                type="number"
                min="0"
                {...register("ageMin")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ageMax">Âge maximum</Label>
              <Input
                id="ageMax"
                type="number"
                min="0"
                {...register("ageMax")}
              />
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Le cadeau sera définitivement supprimé.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}