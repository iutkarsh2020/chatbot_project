import { useState, type KeyboardEvent } from "react"
import type { Message } from "./chat-container"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Send, X } from "lucide-react"
import { Badge } from "./ui/badge"

interface ChatInputProps {
  messages: Message[]
  selectedMessageIds: Set<string>
  onSendMessage: (content: string, contextMessages: Message[]) => void
  onClearSelection: () => void
}

export function ChatInput({ messages, selectedMessageIds, onSendMessage, onClearSelection }: ChatInputProps) {
  const [input, setInput] = useState("")

  const selectedMessages = messages.filter((msg) => selectedMessageIds.has(msg.id))

  const handleSend = () => {
    if (!input.trim()) return

    onSendMessage(input, selectedMessages)
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t bg-card p-4">
      {/* Selected Context Indicator */}
      {selectedMessageIds.size > 0 && (
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            {selectedMessageIds.size} message{selectedMessageIds.size > 1 ? "s" : ""} selected as context
          </Badge>
          <Button variant="ghost" size="sm" onClick={onClearSelection} className="h-6 px-2">
            <X className="h-3 w-3" />
            Clear
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          className="min-h-[60px] resize-none"
          rows={2}
        />
        <Button onClick={handleSend} disabled={!input.trim()} size="icon" className="h-[60px] w-[60px] shrink-0">
          <Send className="h-5 w-5" />
        </Button>
      </div>

      {/* Context Preview */}
      {selectedMessages.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Context to be sent:</p>
          <div className="max-h-32 space-y-1 overflow-y-auto rounded-md bg-muted p-2">
            {selectedMessages.map((msg) => (
              <div key={msg.id} className="text-xs text-muted-foreground">
                <span className="font-medium">{msg.role === "user" ? "You" : "Assistant"}:</span>{" "}
                {msg.content.substring(0, 100)}
                {msg.content.length > 100 ? "..." : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
