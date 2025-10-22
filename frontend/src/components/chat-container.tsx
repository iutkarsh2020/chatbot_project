import { useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { Card } from "./ui/card"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! How can I help you today? You can select any previous message to include it as context for your next question.",
      timestamp: new Date(),
    },
  ])
  const [selectedMessageIds, setSelectedMessageIds] = useState<Set<string>>(new Set())

  const handleSendMessage = async (content: string, contextMessages: Message[]) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Clear selected messages after sending
    setSelectedMessageIds(new Set())

    // Simulate AI response with context
    setTimeout(() => {
      const contextInfo =
        contextMessages.length > 0
          ? `\n\n(Responding with context from ${contextMessages.length} previous message${contextMessages.length > 1 ? "s" : ""})`
          : ""

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${content}"${contextInfo}\n\nThis is a simulated response. In a real implementation, this would be sent to your backend API along with the selected context messages.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessageIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  const clearSelection = () => {
    setSelectedMessageIds(new Set())
  }

  return (
        <Card className="flex h-[80vh] w-full max-w-3xl flex-col overflow-hidden">
        <ChatHeader />
        <ChatMessages
            messages={messages}
            selectedMessageIds={selectedMessageIds}
            onToggleSelection={toggleMessageSelection}
        />
        <ChatInput
            messages={messages}
            selectedMessageIds={selectedMessageIds}
            onSendMessage={handleSendMessage}
            onClearSelection={clearSelection}
        />
        </Card>
    
  )
}
