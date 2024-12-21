import { useSupabaseQuery } from './useSupabaseQuery'
import { supabase } from '@/lib/supabase'
import type { GiftList } from '@/types/gift'

export function useGiftLists() {
  const { data: lists, loading, error } = useSupabaseQuery<GiftList[]>(
    () => supabase
      .from('gift_lists')
      .select('*')
      .order('created_at', { ascending: false }),
    []
  )

  return { 
    lists: lists || [], 
    loading, 
    error: error?.message 
  }
}