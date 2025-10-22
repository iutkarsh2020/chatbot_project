import type { Message } from "./chat-container"
import { cn } from "../lib/utils"
import { Bot, User, Check } from "lucide-react"

interface ChatMessageProps {
  message: Message
  isSelected: boolean
  onToggleSelection: (messageId: string) => void
}

export function ChatMessage({ message, isSelected, onToggleSelection }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "group relative flex gap-3 rounded-lg p-4 transition-all cursor-pointer",
        isUser ? "flex-row-reverse" : "flex-row",
        isSelected ? "bg-selected ring-2 ring-primary" : "hover:bg-accent",
      )}
      onClick={() => onToggleSelection(message.id)}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary" : "bg-secondary",
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-secondary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("flex-1 space-y-1", isUser ? "text-right" : "text-left")}>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">{isUser ? "You" : "Assistant"}</p>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p
          className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            isSelected ? "text-selected-foreground" : "text-foreground",
          )}
        >
          {message.content}
        </p>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}
