import { useRef, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useChat } from "@/hooks/useChat"
import { Card } from "@/components/ui/card"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"
import { DashboardHeader } from "../dashboard/DashboardHeader"

export function ChatWindow() {
  const { user } = useAuth()
  const { messages, loading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="space-y-8">
      <DashboardHeader title="Family Chat" />
      
      <Card className="h-[calc(100vh-12rem)] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 animate-pulse"
                >
                  <div className="w-8 h-8 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MessageList messages={messages} currentUserId={user?.id} />
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <MessageInput />
        </div>
      </Card>
    </div>
  )
}