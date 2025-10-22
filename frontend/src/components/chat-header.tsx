import { MessageSquare } from "lucide-react"

export function ChatHeader() {
  return (
    <div className="flex items-center gap-3 border-b bg-card px-6 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
        <MessageSquare className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="font-semibold text-card-foreground">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">Click messages to add context</p>
      </div>
    </div>
  )
}
