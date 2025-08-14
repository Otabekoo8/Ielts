import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-4 px-6 bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">IM</div>
        <div>
          <Link to="/" className="font-semibold text-lg">IELTS Mock Test</Link>
          <div className="text-xs text-slate-500">Practice with confidence</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/admin" className="btn btn-ghost">Admin</Link>
        <Link to="/student" className="btn btn-primary">For Students</Link>
      </div>
    </div>
  )
}
