import { useState } from "react"
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery"
import { getGiftItems } from "@/lib/gifts"
import { Card } from "@/components/ui/card"
import { GiftFilters } from "./filters/GiftFilters"
import { GiftItemCard } from "./GiftItemCard"
import { useGiftFilters } from "./hooks/useGiftFilters"
import type { GiftItem } from "@/types/gift"

interface GiftItemListProps {
  listId: string
  isOwner: boolean
}

export function GiftItemList({ listId, isOwner }: GiftItemListProps) {
  const { data: items, loading, error } = useSupabaseQuery<GiftItem[]>(
    () => getGiftItems(listId),
    [listId]
  )

  const { filters, filteredItems, updateFilters } = useGiftFilters(items || [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-32 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-destructive">
          Une erreur est survenue lors du chargement des cadeaux
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <GiftFilters 
        filters={filters}
        itemCount={filteredItems.length}
        onFiltersChange={updateFilters}
      />

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <GiftItemCard
            key={item.id}
            item={item}
            isOwner={isOwner}
          />
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">
              Aucun cadeau ne correspond à vos critères
            </p>
          </div>
        )}
      </div>
    </div>
  )
}