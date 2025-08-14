import React from 'react'
import { motion } from 'framer-motion'

export default function QuestionCard({ question, index, selected, onSelect }) {
  return (
    <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="card">
      <div className="mb-4 text-sm text-slate-500">Question {index + 1}</div>
      <div className="font-semibold text-lg mb-4">{question.q}</div>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const checked = selected === i
          return (
            <label key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${checked ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100'} cursor-pointer`}>
              <input type="radio" name={`q-${question.id}`} checked={checked} onChange={() => onSelect(i)} className="w-4 h-4" />
              <span className="text-sm">{opt}</span>
            </label>
          )
        })}
      </div>
    </motion.div>
  )
}