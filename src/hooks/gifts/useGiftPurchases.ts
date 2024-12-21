import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { GiftPurchase } from '@/types/gift'

export function useGiftPurchases(listId: string) {
  const [purchases, setPurchases] = useState<GiftPurchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPurchases() {
      try {
        const { data, error } = await supabase
          .from('gift_purchases')
          .select('*')
          .eq('list_id', listId)
          .order('purchase_date', { ascending: false })

        if (error) throw error
        setPurchases(data)
      } catch (err) {
        console.error('Error loading purchases:', err)
        setError('Impossible de charger les achats')
      } finally {
        setLoading(false)
      }
    }

    loadPurchases()
  }, [listId])

  return { purchases, loading, error }
}