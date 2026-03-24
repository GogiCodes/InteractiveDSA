'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ChevronDown,
  Code2,
  TreePine,
  Network,
  List,
  Zap,
  BookOpen,
} from 'lucide-react'

interface Topic {
  id: string
  label: string
  icon: React.ReactNode
  count: number
}

const topics: Topic[] = [
  { id: 'arrays', label: 'Arrays', icon: <List size={18} />, count: 12 },
  { id: 'linked-list', label: 'Linked List', icon: <List size={18} />, count: 8 },
  { id: 'trees', label: 'Trees', icon: <TreePine size={18} />, count: 15 },
  { id: 'graphs', label: 'Graphs', icon: <Network size={18} />, count: 10 },
  { id: 'stack-queue', label: 'Stack & Queue', icon: <Zap size={18} />, count: 7 },
  { id: 'dp', label: 'Dynamic Programming', icon: <Code2 size={18} />, count: 9 },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const [activeCategory, setActiveCategory] = useState('arrays')

  return (
    <div className="w-64 glass border-r border-neon-purple/20 h-full flex flex-col sticky top-16">
      {/* Logo */}
      <div className="p-6 border-b border-neon-cyan/20">
        <h1 className="text-3xl font-black bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          DSA
        </h1>
        <p className="text-xs text-slate-400 mt-1">Interactive Learning</p>
      </div>

      {/* Topics List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-semibold text-neon-cyan/70 uppercase mb-4">Topics</h2>
          <div className="space-y-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveCategory(topic.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === topic.id
                    ? 'glass border-l-4 border-neon-cyan text-neon-cyan shadow-glow-cyan'
                    : 'text-slate-400 hover:text-neon-purple hover:bg-white/5'
                }`}
              >
                <span className="text-neon-purple">{topic.icon}</span>
                <span className="flex-1 text-left">{topic.label}</span>
                <span className="text-xs bg-neon-purple/20 px-2 py-1 rounded text-neon-purple border border-neon-purple/30">
                  {topic.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="p-4 border-t border-neon-cyan/20">
          <h2 className="text-xs font-semibold text-neon-purple/70 uppercase mb-4">Resources</h2>
          <div className="space-y-2">
            <Link href="/explore" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-neon-cyan hover:bg-white/5 transition-all">
              <BookOpen size={18} className="text-neon-cyan/60" />
              Explore
            </Link>
            <Link href="/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-neon-pink hover:bg-white/5 transition-all">
              <Zap size={18} className="text-neon-pink/60" />
              Leaderboard
            </Link>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-neon-purple/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center shadow-glow-cyan">
              <span className="text-dark-bg font-bold">J</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-200">John</p>
              <p className="text-xs text-slate-500">Profile</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-neon-purple transition">
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
