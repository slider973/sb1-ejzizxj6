import { supabase } from '../supabase'
import type { GiftList, GiftItem } from '@/types/gift'

export async function createGiftList(data: Omit<GiftList, 'id' | 'created_at' | 'archived'>) {
  const { data: list, error } = await supabase
    .from('gift_lists')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return list
}

export async function updateGiftList(
  listId: string,
  data: Partial<Omit<GiftList, 'id' | 'created_at' | 'created_by'>>
) {
  const { data: list, error } = await supabase
    .from('gift_lists')
    .update(data)
    .eq('id', listId)
    .select()
    .single()

  if (error) throw error
  return list
}

export async function deleteGiftList(listId: string) {
  const { error } = await supabase
    .from('gift_lists')
    .delete()
    .eq('id', listId)

  if (error) throw error
}