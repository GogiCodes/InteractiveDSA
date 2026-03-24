'use client'

import { useState } from 'react'
import { Lightbulb, ChevronDown } from 'lucide-react'

interface Hint {
  level: number
  text: string
}

interface HintsPanelProps {
  hints?: Hint[]
}

export default function HintsPanel({
  hints = [
    {
      level: 1,
      text: 'Think about using a hash map (dictionary) to store the numbers you have already seen.'
    },
    {
      level: 2,
      text: 'For each number, check if (target - number) exists in your hash map. If yes, you found your pair!'
    },
    {
      level: 3,
      text: 'Store each number and its index in the hash map as you iterate. Time complexity: O(n), Space: O(n)'
    }
  ]
}: HintsPanelProps) {
  const [revealedHints, setRevealedHints] = useState<number[]>([])

  const toggleHint = (level: number) => {
    setRevealedHints(prev =>
      prev.includes(level) ? prev.filter(h => h !== level) : [...prev, level]
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={20} className="text-neon-purple" />
        <h3 className="font-bold text-neon-purple">Hints</h3>
      </div>

      {hints.map((hint) => (
        <div
          key={hint.level}
          className="glass border-neon-purple/20 rounded-lg overflow-hidden hover:border-neon-purple/40 transition"
        >
          <button
            onClick={() => toggleHint(hint.level)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3 text-left">
              <span className="inline-block px-2 py-1 bg-neon-purple/20 text-neon-purple rounded text-xs font-bold border border-neon-purple/30">
                Hint {hint.level}
              </span>
              {revealedHints.includes(hint.level) ? (
                <span className="text-sm text-slate-300">Hint revealed</span>
              ) : (
                <span className="text-sm text-slate-400">Click to reveal</span>
              )}
            </div>
            <ChevronDown
              size={18}
              className={`text-neon-purple/60 transition ${
                revealedHints.includes(hint.level) ? 'rotate-180' : ''
              }`}
            />
          </button>

          {revealedHints.includes(hint.level) && (
            <div className="px-4 py-3 bg-neon-purple/10 border-t border-neon-purple/20 text-sm text-slate-300">
              {hint.text}
            </div>
          )}
        </div>
      ))}

      <button className="w-full mt-3 px-4 py-2 glass border-neon-cyan/20 text-neon-cyan rounded-lg hover:bg-white/10 transition font-bold text-sm">
        Get More Help
      </button>
    </div>
  )
}
