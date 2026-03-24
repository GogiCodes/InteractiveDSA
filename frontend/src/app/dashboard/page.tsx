'use client'

import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Award, TrendingUp, Zap, Target, Calendar, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2 drop-shadow-lg">Dashboard</h1>
              <p className="text-slate-400">Your learning progress and achievements</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Problems Solved */}
              <div className="glass border-neon-cyan/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Problems Solved</p>
                    <p className="text-3xl font-black text-neon-cyan drop-shadow-lg">47</p>
                    <p className="text-xs text-slate-400 mt-2">+3 this week</p>
                  </div>
                  <Target size={32} className="text-neon-cyan opacity-30" />
                </div>
              </div>

              {/* Current Streak */}
              <div className="glass border-neon-green/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Current Streak</p>
                    <p className="text-3xl font-black text-neon-green drop-shadow-lg">12</p>
                    <p className="text-xs text-slate-400 mt-2">days 🔥</p>
                  </div>
                  <Zap size={32} className="text-neon-green opacity-30" />
                </div>
              </div>

              {/* Accuracy Rate */}
              <div className="glass border-neon-purple/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Accuracy Rate</p>
                    <p className="text-3xl font-black text-neon-purple drop-shadow-lg">85%</p>
                    <p className="text-xs text-slate-400 mt-2">+2% this week</p>
                  </div>
                  <TrendingUp size={32} className="text-neon-purple opacity-30" />
                </div>
              </div>

              {/* Rank */}
              <div className="glass border-neon-pink/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Global Rank</p>
                    <p className="text-3xl font-black text-neon-pink drop-shadow-lg">#1,234</p>
                    <p className="text-xs text-slate-400 mt-2">Top 5%</p>
                  </div>
                  <Trophy size={32} className="text-neon-pink opacity-30" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress by Category */}
              <div className="lg:col-span-2 glass border-neon-cyan/20 rounded-xl p-6">
                <h2 className="text-lg font-bold text-neon-cyan mb-6">Progress by Category</h2>
                <div className="space-y-4">
                  {[
                    { category: 'Arrays', solved: 10, total: 12, color: 'from-neon-cyan to-neon-purple' },
                    { category: 'Linked List', solved: 8, total: 8, color: 'from-neon-green to-neon-cyan' },
                    { category: 'Trees', solved: 12, total: 15, color: 'from-neon-purple to-neon-pink' },
                    { category: 'Graphs', solved: 8, total: 10, color: 'from-neon-pink to-neon-purple' },
                    { category: 'Stack & Queue', solved: 5, total: 7, color: 'from-neon-cyan to-neon-green' },
                    { category: 'Dynamic Programming', solved: 4, total: 9, color: 'from-neon-purple to-neon-pink' },
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-slate-200">{item.category}</p>
                        <span className="text-xs text-slate-400">{item.solved}/{item.total}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-600/40 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all`}
                          style={{ width: `${(item.solved / item.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="glass border-neon-purple/20 rounded-xl p-6">
                <h2 className="text-lg font-bold text-neon-purple mb-6">Achievements</h2>
                <div className="space-y-3">
                  {[
                    { name: 'First Steps', icon: '🚀', desc: 'Solve your first problem' },
                    { name: 'Streak 7', icon: '🔥', desc: '7-day streak' },
                    { name: 'Array Master', icon: '📊', desc: 'Solve 10 Array problems' },
                    { name: 'Speed Runner', icon: '⚡', desc: 'Solve in <1 minute' },
                  ].map((achievement) => (
                    <div key={achievement.name} className="glass border-neon-pink/20 p-3 rounded-lg hover:bg-white/10 transition">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <p className="font-bold text-slate-200 text-sm">{achievement.name}</p>
                          <p className="text-xs text-slate-400">{achievement.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 glass border-neon-green/20 rounded-xl p-6">
              <h2 className="text-lg font-bold text-neon-green mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { time: '2 hours ago', action: 'Solved "Two Sum" in Arrays', status: '✓' },
                  { time: '5 hours ago', action: 'Attempted "Median of Two Sorted Arrays"', status: '✕' },
                  { time: 'Yesterday', action: 'Completed Arrays category', status: '✓' },
                  { time: 'Yesterday', action: 'Solved "Reverse Linked List"', status: '✓' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-bold text-slate-200 text-sm">{activity.action}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                    <span className={`text-lg font-bold ${activity.status === '✓' ? 'text-neon-green' : 'text-neon-pink'}`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6 glass border-neon-purple/20 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-black bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2 drop-shadow-lg">Keep Pushing! 💪</h3>
              <p className="mb-4 text-slate-300">Solve 3 more problems to reach a 30-day streak!</p>
              <Link
                href="/problems"
                className="inline-block px-6 py-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg rounded-lg font-bold hover:shadow-glow-cyan transition"
              >
                Continue Solving
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
