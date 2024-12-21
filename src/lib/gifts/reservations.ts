import { supabase } from '../supabase'

export async function reserveGift(itemId: string, userId: string) {
  const reservationDuration = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const expiresAt = new Date(Date.now() + reservationDuration)

  const { data: item, error } = await supabase
    .from('gift_items')
    .update({
      reserved: true,
      reserved_by: userId,
      reserved_at: new Date().toISOString(),
      reservation_expires_at: expiresAt.toISOString()
    })
    .eq('id', itemId)
    .select()
    .single()

  if (error) throw error
  return item
}

export async function cancelReservation(itemId: string, userId: string) {
  const { data: item, error } = await supabase
    .from('gift_items')
    .update({
      reserved: false,
      reserved_by: null,
      reserved_at: null,
      reservation_expires_at: null
    })
    .eq('id', itemId)
    .eq('reserved_by', userId)
    .select()
    .single()

  if (error) throw error
  return item
}

export async function markGiftAsPurchased(itemId: string, userId: string) {
  const { data: item, error } = await supabase
    .from('gift_items')
    .update({
      purchased: true,
      purchased_by: userId,
      purchased_at: new Date().toISOString(),
      reserved: false,
      reserved_by: null,
      reserved_at: null,
      reservation_expires_at: null
    })
    .eq('id', itemId)
    .select()
    .single()

  if (error) throw error
  return item
}