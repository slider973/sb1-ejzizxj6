import { Card } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useGiftPurchases } from '@/hooks/gifts/useGiftPurchases'

interface GiftPurchaseInfoProps {
  listId: string
}

export function GiftPurchaseInfo({ listId }: GiftPurchaseInfoProps) {
  const { purchases, loading, error } = useGiftPurchases(listId)

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-muted rounded w-1/3" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          <p>{error}</p>
        </div>
      </Card>
    )
  }

  if (purchases.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Cadeaux achetés
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          Aucun cadeau n'a encore été acheté
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        Cadeaux achetés
      </h3>
      <div className="space-y-4">
        {purchases.map((purchase, index) => (
          <div 
            key={index}
            className="text-sm border-b last:border-0 pb-3 last:pb-0"
          >
            <p className="font-medium">{purchase.item_title}</p>
            <p className="text-muted-foreground text-xs space-x-1">
              <span>Acheté par {purchase.purchaser_email}</span>
              <span>•</span>
              <span>{format(new Date(purchase.purchase_date), 'PPP', { locale: fr })}</span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}