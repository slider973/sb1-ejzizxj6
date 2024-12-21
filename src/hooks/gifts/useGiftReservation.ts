import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { reserveGift, cancelReservation } from '@/lib/gifts'

export function useGiftReservation() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReserve = async (itemId: string) => {
    if (!user || loading) return
    setLoading(true)
    try {
      await reserveGift(itemId, user.id)
      setError(null)
    } catch (err) {
      console.error('Error reserving item:', err)
      setError('Impossible de réserver le cadeau')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelReservation = async (itemId: string) => {
    if (!user || loading) return
    setLoading(true)
    try {
      await cancelReservation(itemId, user.id)
      setError(null)
    } catch (err) {
      console.error('Error canceling reservation:', err)
      setError('Impossible d\'annuler la réservation')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleReserve,
    handleCancelReservation
  }
}