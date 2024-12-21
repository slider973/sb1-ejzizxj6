import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { markGiftAsPurchased, reserveGift, cancelReservation } from "@/lib/gifts"
import { ShoppingBag, Link as LinkIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import type { GiftItem } from "@/types/gift"

interface GiftItemCardProps {
  item: GiftItem
  isOwner: boolean
  onUpdate?: () => void
}

export function GiftItemCard({ item, isOwner, onUpdate }: GiftItemCardProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    if (!user || loading) return
    setLoading(true)
    try {
      await markGiftAsPurchased(item.id, user.id)
      onUpdate?.()
    } catch (error) {
      console.error('Error marking item as purchased:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReserve = async () => {
    if (!user || loading) return
    setLoading(true)
    try {
      await reserveGift(item.id, user.id)
      onUpdate?.()
    } catch (error) {
      console.error('Error reserving item:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelReservation = async () => {
    if (!user || loading) return
    setLoading(true)
    try {
      await cancelReservation(item.id, user.id)
      onUpdate?.()
    } catch (error) {
      console.error('Error canceling reservation:', error)
    } finally {
      setLoading(false)
    }
  }

  const isReservedByUser = item.reserved_by === user?.id
  const canPurchase = !item.purchased && (!item.reserved || isReservedByUser)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium">{item.title}</h4>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
          {item.price && (
            <p className="text-sm text-gray-600 mt-1">
              ${item.price.toFixed(2)}
            </p>
          )}
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-blue-500 hover:text-blue-600"
          >
            <LinkIcon className="h-5 w-5" />
          </a>
        )}
      </div>

      {!isOwner && !item.purchased && (
        <div className="mt-4 space-y-2">
          {item.reserved ? (
            isReservedByUser ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    Reserved by you {formatDistanceToNow(new Date(item.reserved_at!))} ago
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancelReservation}
                    disabled={loading}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel Reservation
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    disabled={loading}
                    className="flex-1"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Reserved by someone else</span>
              </div>
            )
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleReserve}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                Reserve
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={loading}
                className="flex-1"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Purchase
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}