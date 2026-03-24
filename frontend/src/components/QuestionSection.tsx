'use client'

import { Bookmark, AlertCircle, Eye, Heart } from 'lucide-react'
import { useState } from 'react'

interface QuestionSectionProps {
  title?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  description?: string
  examples?: Array<{ input: string; output: string }>
}

const difficultyColors = {
  easy: 'bg-neon-green/10 text-neon-green border-neon-green/30',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  hard: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30',
}

export default function QuestionSection({
  title = 'Two Sum',
  difficulty = 'easy',
  description,
  examples = []
}: QuestionSectionProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className="glass border-neon-cyan/20 rounded-xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-neon-cyan/20 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-neon-cyan drop-shadow-lg">{title}</h2>
            <div className="flex items-center gap-3 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[difficulty]}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
              <span className="text-xs text-slate-400">Solved: 1,234 · Pass Rate: 65%</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg transition ${
                bookmarked
                  ? 'bg-neon-cyan/20 text-neon-cyan shadow-glow-cyan'
                  : 'bg-white/5 text-slate-400 hover:text-neon-cyan'
              }`}
            >
              <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition ${
                liked ? 'bg-neon-pink/20 text-neon-pink shadow-glow-pink' : 'bg-white/5 text-slate-400 hover:text-neon-pink'
              }`}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none">
          <p className="text-slate-300 leading-relaxed mb-6">
            {description || 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice. You can return the answer in any order.'}
          </p>

          {/* Constraints */}
          <div className="glass border-neon-purple/20 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-neon-purple mb-3">Constraints</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• 2 ≤ nums.length ≤ 10⁴</li>
              <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>• -10⁹ ≤ target ≤ 10⁹</li>
              <li>• Only one valid answer exists</li>
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h3 className="font-bold text-neon-pink mb-4">Examples</h3>
            <div className="space-y-4">
              {examples.length > 0 ? (
                examples.map((ex, i) => (
                  <div key={i} className="glass border-neon-cyan/20 rounded-lg p-4">
                    <p className="text-sm font-bold text-neon-cyan">Example {i + 1}</p>
                    <code className="block mt-2 text-xs bg-dark-bg/50 text-neon-green p-3 rounded border border-neon-green/20 overflow-x-auto">
                      Input: {ex.input}
                    </code>
                    <code className="block mt-2 text-xs bg-dark-bg/50 text-neon-green p-3 rounded border border-neon-green/20 overflow-x-auto">
                      Output: {ex.output}
                    </code>
                  </div>
                ))
              ) : (
                <>
                  <div className="glass border-neon-cyan/20 rounded-lg p-4">
                    <p className="text-sm font-bold text-neon-cyan">Example 1:</p>
                    <code className="block mt-2 text-xs bg-dark-bg/50 text-neon-green p-3 rounded border border-neon-green/20">
                      Input: nums = [2,7,11,15], target = 9
                    </code>
                    <code className="block mt-2 text-xs bg-dark-bg/50 text-neon-green p-3 rounded border border-neon-green/20">
                      Output: [0,1]
                    </code>
                  </div>
                  <div className="glass border-neon-cyan/20 rounded-lg p-4">
                    <p className="text-sm font-bold text-neon-cyan">Example 2:</p>
                    <code className="block mt-2 text-xs bg-dark-bg/50 text-neon-green p-3 rounded border border-neon-green/20">
                      Input: nums = [3,2,4], target = 6
                    </code>
                    <code className="block mt-2 text-xs bg-dark-bg/50 text-neon-green p-3 rounded border border-neon-green/20">
                      Output: [1,2]
                    </code>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
