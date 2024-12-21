import { supabase } from '../supabase'
import type { GiftItem } from '@/types/gift'

export async function addGiftItem(data: Omit<GiftItem, 'id' | 'created_at' | 'purchased' | 'purchased_by' | 'purchased_at' | 'reserved' | 'reserved_by' | 'reserved_at' | 'reservation_expires_at'>) {
  const { data: item, error } = await supabase
    .from('gift_items')
    .insert([{
      ...data,
      purchased: false,
      reserved: false
    }])
    .select()
    .single()

  if (error) throw error
  return item
}

export async function updateGiftItem(
  itemId: string, 
  data: Partial<Omit<GiftItem, 'id' | 'created_at' | 'list_id'>>
) {
  const { data: item, error } = await supabase
    .from('gift_items')
    .update(data)
    .eq('id', itemId)
    .select()
    .single()

  if (error) throw error
  return item
}

export async function deleteGiftItem(itemId: string) {
  const { error } = await supabase
    .from('gift_items')
    .delete()
    .eq('id', itemId)

  if (error) throw error
}