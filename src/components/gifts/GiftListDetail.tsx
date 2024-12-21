import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import { GiftItemList } from "./GiftItemList"
import { GiftPurchaseInfo } from "./GiftPurchaseInfo"
import { CreateGiftItemDialog } from "./CreateGiftItemDialog"
import type { GiftList } from "@/types/gift"

interface GiftListDetailProps {
  list: GiftList
  isOwner: boolean
  onBack: () => void
}

export function GiftListDetail({ list, isOwner, onBack }: GiftListDetailProps) {
  const [showCreateItem, setShowCreateItem] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold">{list.title}</h2>
            <p className="text-sm text-muted-foreground">{list.occasion}</p>
          </div>
        </div>

        {isOwner && (
          <Button onClick={() => setShowCreateItem(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un cadeau
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <GiftItemList listId={list.id} isOwner={isOwner} />
        </div>

        <div className="space-y-6">
          {isOwner && <GiftPurchaseInfo listId={list.id} />}

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Détails de l'enfant</h3>
            <dl className="space-y-2">
              {list.child_name && (
                <div>
                  <dt className="text-sm text-muted-foreground">Nom</dt>
                  <dd className="font-medium">{list.child_name}</dd>
                </div>
              )}
              {list.age && (
                <div>
                  <dt className="text-sm text-muted-foreground">Âge</dt>
                  <dd className="font-medium">{list.age} ans</dd>
                </div>
              )}
              {list.interests && list.interests.length > 0 && (
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Centres d'intérêt</dt>
                  <dd className="flex flex-wrap gap-2">
                    {list.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {interest}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {list.size_info && (
                <div className="border-t pt-2 mt-4">
                  <dt className="text-sm text-muted-foreground mb-2">Tailles</dt>
                  <dd className="grid grid-cols-2 gap-2 text-sm">
                    {list.size_info.clothes && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Vêtements:</span>
                        <span className="font-medium">{list.size_info.clothes}</span>
                      </div>
                    )}
                    {list.size_info.shoes && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Chaussures:</span>
                        <span className="font-medium">{list.size_info.shoes}</span>
                      </div>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </Card>
        </div>
      </div>

      <CreateGiftItemDialog
        open={showCreateItem}
        onOpenChange={setShowCreateItem}
        listId={list.id}
        childAge={list.age || 0}
      />
    </div>
  )
}