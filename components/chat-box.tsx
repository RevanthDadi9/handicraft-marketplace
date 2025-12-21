"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMessages, sendMessage } from "@/app/actions-chat"

interface Message {
    id: string
    content: string
    createdAt: Date
    sender: {
        id: string
        email: string
        profile: {
            fullName: string
        } | null
    }
}

export function ChatBox({ orderId, currentUserId }: { orderId: string, currentUserId: string }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // Polling for messages every 3 seconds
    useEffect(() => {
        fetchMessages()
        const interval = setInterval(fetchMessages, 3000)
        return () => clearInterval(interval)
    }, [])

    async function fetchMessages() {
        const msgs = await getMessages(orderId)
        setMessages(msgs as any)
    }

    async function handleSend(e: React.FormEvent) {
        e.preventDefault()
        if (!newMessage.trim()) return

        setLoading(true)
        const storeMsg = newMessage
        setNewMessage("") // Optimistic clear

        await sendMessage({ orderId, content: storeMsg })
        await fetchMessages()
        setLoading(false)
    }

    return (
        <div className="flex flex-col h-[500px] border rounded-lg">
            <div className="p-4 border-b bg-muted/50 font-semibold">
                Messages
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => {
                        const isMe = msg.sender.id === currentUserId
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-lg p-3 ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    }`}>
                                    <p className="text-sm font-medium mb-1 opacity-75">
                                        {isMe ? 'You' : msg.sender.profile?.fullName || msg.sender.email}
                                    </p>
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        )
                    })}
                    {messages.length === 0 && (
                        <p className="text-center text-muted-foreground text-sm italic">No messages yet. Start the conversation!</p>
                    )}
                </div>
            </ScrollArea>

            <div className="p-4 border-t">
                <form onSubmit={handleSend} className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading}>Send</Button>
                </form>
            </div>
        </div>
    )
}
