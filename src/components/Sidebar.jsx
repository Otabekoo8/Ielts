import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiPlusCircle, FiList, FiClock } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <aside className="h-[auto] w-1/4 min-w-[260px] p-6 bg-[linear-gradient(180deg,#6D28D9,#4F46E5)] text-white rounded-tr-3xl rounded-br-3xl">
      <div className="mb-8">
        <div className="text-2xl font-bold mb-1">Admin Panel</div>
        <div className="text-sm text-indigo-100/80">Manage questions & tests</div>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" className={({isActive}) => `py-3 px-4 rounded-xl ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
          <div className="flex items-center gap-3"><FiList /> Questions</div>
        </NavLink>
        <NavLink to="/admin/new" className={({isActive}) => `py-3 px-4 rounded-xl ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
          <div className="flex items-center gap-3"><FiPlusCircle /> Add Question</div>
        </NavLink>
        <NavLink to="/admin/timer" className={({isActive}) => `py-3 px-4 rounded-xl ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
          <div className="flex items-center gap-3"><FiClock /> Timer</div>
        </NavLink>
      </nav>
      <div className="mt-auto text-sm text-indigo-100/70">Logged in as <strong>Admin</strong></div>
    </aside>
  )
}
