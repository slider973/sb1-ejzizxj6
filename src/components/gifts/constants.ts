export const GIFT_CATEGORIES = ["all", "toys", "clothes", "books", "electronics", "other"] as const
export const GIFT_PRIORITIES = ["all", "high", "medium", "low"] as const
export const GIFT_STATUSES = ["all", "available", "purchased"] as const

export const AGE_RANGES = {
  BABY: { min: 0, max: 2 },
  TODDLER: { min: 3, max: 5 },
  CHILD: { min: 6, max: 9 },
  PRETEEN: { min: 10, max: 12 },
  TEEN: { min: 13, max: 17 }
} as const

export const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000]