export interface GiftList {
  id: string
  title: string
  description: string | null
  occasion: string
  created_by: string
  created_at: string
  archived: boolean
  child_name: string | null
  age: number | null
  interests: string[]
  size_info: {
    clothes?: string
    shoes?: string
  }
}

export interface GiftItem {
  id: string
  list_id: string
  title: string
  description: string | null
  url: string | null
  price: number | null
  priority: 'high' | 'medium' | 'low'
  category: 'toys' | 'clothes' | 'books' | 'electronics' | 'other'
  age_range?: {
    min: number
    max: number
  }
  purchased: boolean
  purchased_by: string | null
  purchased_at: string | null
  reserved: boolean
  reserved_by: string | null
  reserved_at: string | null
  reservation_expires_at: string | null
}

export interface GiftPurchase {
  item_id: string
  item_title: string
  purchase_date: string
  list_id: string
  purchaser_email: string
  list_owner_id: string
}

export interface GiftReservation {
  item_id: string
  reserved_by: string
  reserved_at: string
  expires_at: string
}