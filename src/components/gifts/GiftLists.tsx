import { useState } from "react"
import { DashboardHeader } from "../dashboard/DashboardHeader"
import { GiftListGrid } from "./GiftListGrid"
import { CreateGiftListDialog } from "./CreateGiftListDialog"

export function GiftLists() {
  const [showCreateList, setShowCreateList] = useState(false)

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="Gift Lists" 
        onCreateNew={() => setShowCreateList(true)}
        createButtonText="New List"
      />
      
      <GiftListGrid />

      <CreateGiftListDialog 
        open={showCreateList} 
        onOpenChange={setShowCreateList}
      />
    </div>
  )
}