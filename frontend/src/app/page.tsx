'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent drop-shadow-2xl">
          Interactive DSA
        </h1>
        
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
          Learn Data Structures and Algorithms through interactive visualizations, 
          animations, and AI-powered guidance.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/problems"
            className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/explore"
            className="glass-btn border-neon-purple hover:shadow-glow-purple"
          >
            Explore
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card border-neon-cyan/30 hover:border-neon-cyan">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3 text-neon-cyan">Visual Learning</h3>
            <p className="text-slate-300">Watch algorithms execute step-by-step with interactive visualizations</p>
          </div>

          <div className="glass-card border-neon-purple/30 hover:border-neon-purple">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-3 text-neon-purple">Code & Practice</h3>
            <p className="text-slate-300">Solve problems in Python, Java, C++ and more with instant feedback</p>
          </div>

          <div className="glass-card border-neon-pink/30 hover:border-neon-pink">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3 text-neon-pink">AI Assistance</h3>
            <p className="text-slate-300">Get intelligent hints and explanations tailored to your learning level</p>
          </div>
        </div>
      </div>
    </main>
  )
}
