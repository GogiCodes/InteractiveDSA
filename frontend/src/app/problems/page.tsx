'use client'

import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { ArrowRight, Zap } from 'lucide-react'

interface Problem {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  solved: number
  acceptance: number
}

const problems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'Arrays',
    solved: 1234,
    acceptance: 65
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'medium',
    category: 'Linked List',
    solved: 890,
    acceptance: 58
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    category: 'String',
    solved: 756,
    acceptance: 52
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    category: 'Arrays',
    solved: 432,
    acceptance: 38
  },
  {
    id: 5,
    title: 'Reverse a Linked List',
    difficulty: 'easy',
    category: 'Linked List',
    solved: 980,
    acceptance: 72
  },
  {
    id: 6,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    category: 'Trees',
    solved: 650,
    acceptance: 61
  },
]

const difficultyColors = {
  easy: 'bg-neon-green/20 text-neon-green border border-neon-green/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  hard: 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30',
}

export default function ProblemsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2 drop-shadow-lg">Problems</h1>
              <p className="text-slate-400">Master Data Structures and Algorithms with curated problems</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="glass border-neon-cyan/20 rounded-xl p-6">
                <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Total Problems</p>
                <p className="text-4xl font-black text-neon-cyan drop-shadow-lg">156</p>
              </div>
              <div className="glass border-neon-green/20 rounded-xl p-6">
                <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Solved</p>
                <p className="text-4xl font-black text-neon-green drop-shadow-lg">47</p>
              </div>
              <div className="glass border-neon-purple/20 rounded-xl p-6">
                <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Success Rate</p>
                <p className="text-4xl font-black text-neon-purple drop-shadow-lg">85%</p>
              </div>
            </div>

            {/* Problems Table */}
            <div className="glass border-neon-cyan/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-neon-cyan/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-neon-cyan uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-neon-cyan uppercase">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-neon-cyan uppercase">Difficulty</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-neon-cyan uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-neon-cyan uppercase">Acceptance</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-neon-cyan uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {problems.map((problem) => (
                    <tr key={problem.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div className="w-6 h-6 rounded-full border-2 border-neon-green bg-neon-green/20 flex items-center justify-center">
                          <span className="text-neon-green text-xs font-bold">✓</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-200">{problem.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[problem.difficulty]}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{problem.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-600/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
                              style={{ width: `${problem.acceptance}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-400 font-bold">{problem.acceptance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition font-bold text-sm"
                        >
                          Solve
                          <ArrowRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
