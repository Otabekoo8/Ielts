import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import { getQuestions } from '../services/api'

export default function StudentTest() {
  const [loading, setLoading] = useState(true)
  const [allQuestions, setAllQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes default
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    getQuestions().then(data => {
      setAllQuestions(data)
      setLoading(false)
    })
  }, [])

  const startTest = () => {
    // **Barcha savollarni olib testni boshlash**
    setQuestions([...allQuestions])
    setCurrent(0)
    setAnswers({})
    setShowResults(false)
    setTimeLeft(600)

    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000)
  }

  useEffect(() => {
    if (timeLeft <= 0 && questions.length) {
      clearInterval(timerRef.current)
      calculateResults()
    }
  }, [timeLeft, questions])

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const selectOption = (qId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }))
  }

  const goNext = () => { if (current < questions.length - 1) setCurrent(c => c + 1) }
  const goPrev = () => { if (current > 0) setCurrent(c => c - 1) }
  const goTo = (i) => { setCurrent(i) }

  const calculateResults = () => {
    const correctCount = questions.reduce((acc, q) => {
      const sel = answers[q.id]
      return acc + (sel === q.answer ? 1 : 0)
    }, 0)
    setShowResults({ correctCount })
    clearInterval(timerRef.current)
  }

  if (loading) return <div className="p-8">Loading questions...</div>

  if (!questions.length) {
    // start screen
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold mb-2">Student Test</h2>
          <p className="text-slate-500 mb-4">Press Start Test to begin. All questions from the database will be included.</p>
          <div className="flex gap-3">
            <button className="btn btn-primary" onClick={startTest}>Start Test</button>
            <button className="btn btn-ghost" onClick={() => navigate('/')}>Return Home</button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const total = questions.length
    const correct = showResults.correctCount
    const percent = Math.round((correct / total) * 100)
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold">Test Results</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="text-sm">Correct</div>
              <div className="text-3xl font-bold text-indigo-600">{correct}</div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="text-sm">Score (%)</div>
              <div className="text-3xl font-bold text-indigo-600">{percent}%</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Answers</h3>
            <div className="flex flex-col gap-3">
              {questions.map((q, i) => {
                const sel = answers[q.id]
                const correct = q.answer
                const isCorrect = sel === correct
                return (
                  <div key={q.id} className="p-3 rounded-lg border bg-white">
                    <div className="font-medium">{i + 1}. {q.q}</div>
                    <div className="mt-2 text-sm text-slate-600">Your: {sel !== undefined ? q.options[sel] : 'No answer'}</div>
                    <div className={`mt-1 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>Correct: {q.options[correct]}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="btn btn-primary" onClick={() => { setQuestions([]); setShowResults(false); }}>Return Home</button>
            <button className="btn btn-ghost" onClick={() => { setQuestions([]); navigate('/') }}>Back to Main</button>
          </div>
        </div>
      </div>
    )
  }

  // test in progress
  const q = questions[current]
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-500">Question {current + 1} / {questions.length}</div>
            <div className="text-sm text-slate-500">Time left: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
          </div>

          <QuestionCard question={q} index={current} selected={answers[q.id]} onSelect={(i) => selectOption(q.id, i)} />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={goPrev} disabled={current===0}>Back</button>
              <button className="btn btn-ghost" onClick={goNext} disabled={current===questions.length-1}>Next</button>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn btn-primary" onClick={calculateResults}>Submit Test</button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {questions.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`w-10 h-10 rounded-full text-sm ${i===current ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{i+1}</button>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-80">
          <div className="card">
            <div className="text-sm text-slate-500">Progress</div>
            <div className="mt-4">
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div style={{width:`${Math.round(((current+1)/questions.length)*100)}%`}} className="h-3 bg-indigo-500" />
              </div>
              <div className="mt-2 text-sm">{current+1} of {questions.length}</div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-500">Answered</div>
              <div className="mt-2 text-lg font-semibold">{Object.keys(answers).length} / {questions.length}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
