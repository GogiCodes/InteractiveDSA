'use client'

import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import QuestionSection from '@/components/QuestionSection'
import CodeEditor from '@/components/CodeEditor'
import VisualizerPanel from '@/components/VisualizerPanel'
import HintsPanel from '@/components/HintsPanel'
import AIChat from '@/components/AIChat'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'solution'>('visualizer')

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            {/* Back Button */}
            <Link href="/problems" className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple mb-4 transition font-bold">
              <ChevronLeft size={16} />
              Back to Problems
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-2rem)]">
              {/* Left Column: Question (1/3) */}
              <div className="lg:col-span-1 min-h-0">
                <QuestionSection
                  title="Two Sum"
                  difficulty="easy"
                />
              </div>

              {/* Middle Column: Code Editor + Tabs (1/3) */}
              <div className="lg:col-span-1 min-h-0 flex flex-col">
                <div className="mb-4 flex gap-2 border-b border-neon-purple/20">
                  <button
                    onClick={() => setActiveTab('visualizer')}
                    className={`px-4 py-2 border-b-2 font-bold transition ${
                      activeTab === 'visualizer'
                        ? 'border-neon-cyan text-neon-cyan'
                        : 'border-transparent text-slate-400 hover:text-neon-cyan'
                    }`}
                  >
                    Visualizer
                  </button>
                  <button
                    onClick={() => setActiveTab('solution')}
                    className={`px-4 py-2 border-b-2 font-bold transition ${
                      activeTab === 'solution'
                        ? 'border-neon-cyan text-neon-cyan'
                        : 'border-transparent text-slate-400 hover:text-neon-cyan'
                    }`}
                  >
                    Solution
                  </button>
                </div>
                
                {activeTab === 'visualizer' ? (
                  <div className="flex-1 min-h-0">
                    <VisualizerPanel />
                  </div>
                ) : (
                  <div className="flex-1 min-h-0">
                    <CodeEditor />
                  </div>
                )}
              </div>

              {/* Right Column: Hints + AI Chat (1/3) */}
              <div className="lg:col-span-1 min-h-0 flex flex-col gap-6">
                {/* Hints Panel */}
                <div className="flex-1 min-h-0 overflow-y-auto glass border-neon-purple/20 rounded-xl p-4">
                  <HintsPanel />
                </div>

                {/* AI Chat */}
                <div className="flex-1 min-h-0">
                  <AIChat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
