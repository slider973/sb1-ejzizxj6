import { useMemo } from "react"
import { format } from "date-fns"
import { MessageGroup } from "./MessageGroup"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ChatMessage } from "@/types/chat"

interface MessageListProps {
  messages: ChatMessage[]
  currentUserId: string | undefined
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesByDate = useMemo(() => {
    const groups: Record<string, ChatMessage[]> = {}
    
    messages.forEach((message) => {
      const date = format(new Date(message.created_at), "yyyy-MM-dd")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    
    return groups
  }, [messages])

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-8">
        {Object.entries(messagesByDate).map(([date, messages]) => (
          <MessageGroup
            key={date}
            date={date}
            messages={messages}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </ScrollArea>
  )
}