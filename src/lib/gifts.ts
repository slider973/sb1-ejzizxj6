import { supabase } from './supabase';
import type { GiftList, GiftItem } from '../types/gift';

// Existing functions...

export async function reserveGift(itemId: string, userId: string) {
  const reservationDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const expiresAt = new Date(Date.now() + reservationDuration);

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
    .single();

  if (error) throw error;
  return item;
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
    .eq('reserved_by', userId) // Only allow canceling own reservations
    .select()
    .single();

  if (error) throw error;
  return item;
}

export async function markGiftAsPurchased(itemId: string, userId: string) {
  const { data: item, error } = await supabase
    .from('gift_items')
    .update({
      purchased: true,
      purchased_by: userId,
      purchased_at: new Date().toISOString(),
      // Clear reservation data when purchased
      reserved: false,
      reserved_by: null,
      reserved_at: null,
      reservation_expires_at: null
    })
    .eq('id', itemId)
    .select()
    .single();

  if (error) throw error;
  return item;
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
    .single();

  if (error) throw error;
  return item;
}

export async function deleteGiftItem(itemId: string) {
  const { error } = await supabase
    .from('gift_items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
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
    .single();

  if (error) throw error;
  return list;
}

export async function deleteGiftList(listId: string) {
  const { error } = await supabase
    .from('gift_lists')
    .delete()
    .eq('id', listId);

  if (error) throw error;
}