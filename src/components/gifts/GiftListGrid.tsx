import { useState } from "react"
import { useGiftLists } from "@/hooks/useGiftLists"
import { GiftListCard } from "./GiftListCard"
import { GiftListDetail } from "./GiftListDetail"
import { useAuth } from "@/contexts/AuthContext"
import type { GiftList } from "@/types/gift"

export function GiftListGrid() {
  const { lists, loading } = useGiftLists()
  const { user } = useAuth()
  const [selectedList, setSelectedList] = useState<GiftList | null>(null)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[200px] rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (selectedList) {
    return (
      <GiftListDetail
        list={selectedList}
        isOwner={selectedList.created_by === user?.id}
        onBack={() => setSelectedList(null)}
      />
    )
  }

  if (lists.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">
          No gift lists yet
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Create a list to start adding gifts
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <GiftListCard
          key={list.id}
          list={list}
          isOwner={list.created_by === user?.id}
          onManage={setSelectedList}
        />
      ))}
    </div>
  )
}