import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 flex flex-col items-center gap-6">
        <motion.h1 initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:0.6}} className="text-4xl md:text-5xl font-extrabold text-center">
          Welcome to <span className="text-indigo-600">IELTS Mock Test</span>
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-slate-500 text-center max-w-2xl">
          Realistic practice environment. Click the button for students to begin a 20-question mock test, or head to admin to manage questions.
        </motion.p>

        <div className="flex gap-4 mt-6">
          <Link to="/admin" className="btn btn-ghost px-6 py-3">For Admin</Link>
          <Link to="/student" className="btn btn-primary px-8 py-3">For Students</Link>
        </div>

        <div className="mt-8 w-full grid grid-cols-2 gap-4">
          <div className="card flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">20</div>
            <div>
              <div className="text-sm text-slate-500">Questions</div>
              <div className="font-semibold">20 per test</div>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">10</div>
            <div>
              <div className="text-sm text-slate-500">Timer</div>
              <div className="font-semibold">10 minutes (optional)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
