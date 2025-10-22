import { useEffect, useRef } from "react"
import type { Message } from "./chat-container"
import { ChatMessage } from "./chat-message"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessagesProps {
  messages: Message[]
  selectedMessageIds: Set<string>
  onToggleSelection: (messageId: string) => void
}

export function ChatMessages({ messages, selectedMessageIds, onToggleSelection }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ScrollArea className="flex-1 p-6">
      <div ref={scrollRef} className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isSelected={selectedMessageIds.has(message.id)}
            onToggleSelection={onToggleSelection}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
