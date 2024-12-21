import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { sendMessage } from "@/lib/chat"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function MessageInput() {
  const { user } = useAuth()
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !message.trim() || sending) return

    setSending(true)
    try {
      await sendMessage(message.trim(), user.id)
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button type="submit" disabled={!message.trim() || sending}>
        <Send className="w-4 h-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  )
}