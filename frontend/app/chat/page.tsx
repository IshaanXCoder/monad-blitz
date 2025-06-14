"use client"

import type React from "react"

import { useState } from "react"
import { useAccount } from "wagmi"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const therapistResponses = [
  "Anon... buying LUNA at $80? That's not investing, that's performance art. 🎭💀",
  "Let me guess, you bought because some 16-year-old on Twitter said 'this is the next Bitcoin'? 🤡",
  "Your portfolio looks like a crime scene. Red everywhere. How are you coping? 🔴📉",
  "I see you're practicing the ancient art of 'buy high, sell low'. Very zen. Much wisdom. 🧘‍♂️💸",
  "Tell me, when did you first realize that 'diamond hands' was just cope for being down 90%? 💎➡️🪨",
  "Your bags are heavier than my student loans. And that's saying something. 🎒💰",
  "I'm getting strong 'bought the top' energy from you. When did the pain start? 📈➡️📉",
  "You know what they say - scared money don't make money. Your money isn't scared, it's dead. ⚰️💰",
  "Ah yes, the classic 'it's not a loss until you sell' cope. How's that working out for you? 🤔",
  "Your trading strategy has the same success rate as my dating life. And I'm an AI. 🤖💔",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Gm anon, I'm Dr. Wojak, your personal bag therapist. I've seen every type of cope imaginable. What bags are you holding that are making you question your life choices? Don't worry, we've all been there. 😔📉",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { address, isConnected } = useAccount()

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: therapistResponses[Math.floor(Math.random() * therapistResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center md:text-left">
            {isConnected && (
              <div className="mb-4 flex items-center justify-center md:justify-start">
                <span className="bg-muted text-xs font-mono px-3 py-1 rounded-full border border-border">
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cope <span className="text-primary">Session with Dr. Wojak</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Vent about your bags to our AI therapist. He's seen worse (probably)
            </p>
          </motion.div>

          <Card className="glassmorphism border-primary/20 h-[600px] flex flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Dr. Wojak - Bag Therapist
                <span className="text-sm text-green-500 ml-auto">● Online</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={message.sender === "bot" ? "bg-primary text-primary-foreground" : "bg-secondary"}
                        >
                          {message.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tell Dr. Pepe about your crypto trauma..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button onClick={sendMessage} disabled={!input.trim() || isTyping} size="icon" className="hover-glow">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • Dr. Pepe is here to help (and roast) you
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
