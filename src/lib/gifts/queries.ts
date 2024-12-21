import { supabase } from '../supabase'
import type { GiftList, GiftItem, GiftPurchase } from '@/types/gift'

export async function getGiftLists() {
  const { data, error } = await supabase
    .from('gift_lists')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as GiftList[]
}

export async function getGiftItems(listId: string) {
  const { data, error } = await supabase
    .from('gift_items')
    .select('*')
    .eq('list_id', listId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as GiftItem[]
}

export async function getGiftPurchases(listId: string) {
  const { data, error } = await supabase
    .from('gift_purchases')
    .select('*')
    .eq('list_id', listId)
    .order('purchase_date', { ascending: false })

  if (error) throw error
  return data as GiftPurchase[]
}