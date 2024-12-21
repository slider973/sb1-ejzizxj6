import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, CalendarDays, User2 } from "lucide-react"
import { format } from "date-fns"
import type { GiftList } from "@/types/gift"

interface GiftListCardProps {
  list: GiftList
  isOwner: boolean
  onManage: (list: GiftList) => void
}

export function GiftListCard({ list, isOwner, onManage }: GiftListCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{list.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              {list.occasion}
            </div>
          </div>
          <Gift className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {list.child_name && (
          <div className="flex items-center gap-2 text-sm">
            <User2 className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{list.child_name}</span>
            {list.age && <span className="text-muted-foreground">({list.age} years old)</span>}
          </div>
        )}

        {list.interests && list.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {list.interests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {list.size_info && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {list.size_info.clothes && (
              <div>
                <span className="text-muted-foreground">Clothes:</span>{" "}
                {list.size_info.clothes}
              </div>
            )}
            {list.size_info.shoes && (
              <div>
                <span className="text-muted-foreground">Shoes:</span>{" "}
                {list.size_info.shoes}
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Created {format(new Date(list.created_at), "MMM d, yyyy")}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="secondary" 
          className="w-full" 
          onClick={() => onManage(list)}
        >
          {isOwner ? "Manage List" : "View Items"}
        </Button>
      </CardFooter>
    </Card>
  )
}