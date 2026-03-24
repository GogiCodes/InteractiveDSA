'use client'

import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react'

export default function VisualizerPanel() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [step, setStep] = useState(0)

  return (
    <div className="glass border-neon-green/20 rounded-xl flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-neon-green/20 p-4">
        <h3 className="font-bold text-neon-green">Algorithm Visualization</h3>
        <p className="text-xs text-slate-400 mt-1">Step-by-step execution</p>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-center bg-dark-bg/50 p-6 overflow-auto">
        <div className="w-full max-w-md">
          {/* Array Visualization */}
          <div className="mb-8">
            <p className="text-xs font-bold text-neon-cyan/70 uppercase mb-3">Input Array</p>
            <div className="flex items-end gap-2">
              {[2, 7, 11, 15].map((num, i) => (
                <div
                  key={i}
                  className={`flex-1 flex flex-col items-center transition-all ${
                    i <= step ? 'scale-110' : ''
                  }`}
                >
                  <div
                    className={`w-full aspect-square rounded-lg flex items-center justify-center font-bold text-dark-bg transition-all ${
                      i === step
                        ? 'bg-neon-green shadow-glow-green'
                        : i < step
                        ? 'bg-neon-cyan/80'
                        : 'bg-slate-600/40'
                    }`}
                  >
                    {num}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">[{i}]</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hash Map Visualization */}
          <div className="mb-8">
            <p className="text-xs font-bold text-neon-purple/70 uppercase mb-3">Hash Map State</p>
            <div className="glass border-neon-purple/20 rounded-lg p-4 space-y-2">
              {step >= 1 && (
                <div className="flex justify-between items-center text-sm p-2 bg-white/5 rounded border border-neon-cyan/20">
                  <code className="font-mono text-neon-green">2</code>
                  <span className="text-slate-400">→</span>
                  <code className="font-mono text-neon-purple">0</code>
                </div>
              )}
              {step >= 2 && (
                <div className="flex justify-between items-center text-sm p-2 bg-white/5 rounded border border-neon-cyan/20">
                  <code className="font-mono text-neon-green">7</code>
                  <span className="text-slate-400">→</span>
                  <code className="font-mono text-neon-purple">1</code>
                </div>
              )}
              {step < 1 && (
                <p className="text-xs text-slate-400 italic text-center py-4">Hash map is empty</p>
              )}
            </div>
          </div>

          {/* Current Step */}
          <div className="glass border-neon-cyan/20 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-400 uppercase mb-1">Current Step</p>
            <p className="text-lg font-bold text-neon-cyan drop-shadow-lg">
              {step === 0 ? 'Initialize' : `Checking num = ${[2, 7, 11, 15][step]}`}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-neon-cyan/20 p-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <SkipBack size={18} className="text-neon-purple" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg rounded-lg hover:shadow-glow-cyan transition"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <SkipForward size={18} className="text-neon-purple" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <RotateCcw size={18} className="text-neon-purple" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="4"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-600/40 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
          />
          <span className="text-xs text-slate-400 font-mono">{step}/4</span>
        </div>
      </div>
    </div>
  )
}
