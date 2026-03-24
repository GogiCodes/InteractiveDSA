'use client'

import { useState } from 'react'
import { Play, Send, Copy, RotateCcw } from 'lucide-react'

interface CodeEditorProps {
  defaultCode?: string
  language?: 'python' | 'javascript' | 'java' | 'cpp' | 'c'
}

export default function CodeEditor({
  defaultCode = 'def twoSum(nums, target):\n    # Write your solution here\n    pass',
  language = 'python'
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  const handleRun = async () => {
    setIsRunning(true)
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500))
    setOutput(`Test Case 1: Passed ✓
Test Case 2: Passed ✓
Test Case 3: Failed ✗
  Expected: [1,2]
  Got: None

Time: 45ms
Memory: 256KB`)
    setIsRunning(false)
  }

  return (
    <div className="glass border-neon-purple/20 rounded-xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-neon-purple/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as any)}
            className="px-4 py-2 glass border-neon-cyan/20 rounded-lg text-sm font-medium text-neon-cyan focus:outline-none focus:border-neon-cyan"
          >
            <option value="python" className="bg-dark-bg text-slate-200">Python 3.11</option>
            <option value="javascript" className="bg-dark-bg text-slate-200">JavaScript</option>
            <option value="java" className="bg-dark-bg text-slate-200">Java 17</option>
            <option value="cpp" className="bg-dark-bg text-slate-200">C++ 17</option>
            <option value="c" className="bg-dark-bg text-slate-200">C 11</option>
          </select>

          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <Copy size={16} className="text-neon-purple" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <RotateCcw size={16} className="text-neon-purple" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg rounded-lg hover:shadow-glow-cyan disabled:opacity-50 transition font-bold text-sm"
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-bg rounded-lg hover:shadow-glow-cyan transition font-bold text-sm">
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="bg-dark-bg text-slate-500 py-4 px-3 text-right text-xs font-mono select-none border-r border-neon-purple/20 overflow-hidden">
          {code.split('\n').map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Code Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-dark-bg text-neon-green font-mono text-sm p-4 focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>

      {/* Output Console */}
      {output && (
        <div className="border-t border-neon-cyan/20 bg-dark-bg text-neon-green p-4 font-mono text-xs overflow-y-auto max-h-48">
          <div className="mb-2 text-neon-cyan">$ Output:</div>
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      )}
    </div>
  )
}
