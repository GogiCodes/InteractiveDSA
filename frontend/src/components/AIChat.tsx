'use client'

import { useState } from 'react'
import { Send, MessageSquare } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant. I can help you understand this problem, explain your code, or provide hints. What would you like help with?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // User message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000))

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'That\'s a great question! For this Two Sum problem, I recommend using a hash map approach. This allows you to store numbers you\'ve seen and their indices, achieving O(n) time complexity instead of O(n²) with brute force.',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }

  return (
    <div className="glass border-neon-pink/20 rounded-xl flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-neon-pink/20 p-4 flex items-center gap-2">
        <MessageSquare size={20} className="text-neon-pink" />
        <h3 className="font-bold text-neon-pink">AI Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg rounded-br-none font-medium'
                  : 'glass border-neon-pink/20 text-slate-300 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="glass border-neon-pink/20 text-slate-300 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-neon-pink/20 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2 glass border-neon-cyan/20 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-gradient-to-r from-neon-pink to-neon-purple text-dark-bg rounded-lg hover:shadow-glow-pink disabled:opacity-50 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
