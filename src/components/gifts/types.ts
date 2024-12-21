import type { GIFT_CATEGORIES, GIFT_PRIORITIES, GIFT_STATUSES } from "./constants"

export type GiftCategory = typeof GIFT_CATEGORIES[number]
export type GiftPriority = typeof GIFT_PRIORITIES[number]
export type GiftStatus = typeof GIFT_STATUSES[number]

export interface FilterState {
  category: GiftCategory
  priority: GiftPriority
  status: GiftStatus
  priceRange: [number, number]
}

export interface GiftItemProps {
  item: GiftItem
  isOwner: boolean
  onReserve?: (itemId: string) => void
  onPurchase?: (itemId: string) => void
}