'use client'

import Link from 'next/link'
import { Settings, LogOut, Bell, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="glass border-b border-neon-cyan/20 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-neon-cyan/50" size={18} />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-neon-cyan/20 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 ml-6">
          {/* Notifications */}
          <button className="relative text-slate-400 hover:text-neon-cyan transition">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-pink rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="text-slate-400 hover:text-neon-purple transition">
            <Settings size={20} />
          </button>

          {/* Logout */}
          <button className="text-slate-400 hover:text-neon-pink transition">
            <LogOut size={20} />
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center shadow-glow-cyan">
            <span className="text-dark-bg font-bold text-sm">J</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
