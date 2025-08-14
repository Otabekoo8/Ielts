import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from '../services/api'

export default function Admin() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ q: '', options: ['', '', '', ''], answer: 0 })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const data = await getQuestions()
    setQuestions(data)
    setLoading(false)
  }

  const beginAdd = () => {
    setEditing(null)
    setForm({ q: '', options: ['', '', '', ''], answer: 0 })
  }

  const beginEdit = (item) => {
    setEditing(item._id)
    setForm({ q: item.questionText, options: [...item.options], answer: item.correctAnswerIndex })
  }

  const handleAdd = async () => {
    if (!form.q.trim()) return alert('Question text required')

    await addQuestion({
      questionText: form.q,
      options: form.options,
      correctAnswerIndex: Number(form.answer)
    })

    await fetchData()
    beginAdd()
  }

  const handleUpdate = async () => {
    if (!editing) return

    await updateQuestion(editing, {
      questionText: form.q,
      options: form.options,
      correctAnswerIndex: Number(form.answer)
    })

    await fetchData()
    setEditing(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this question?')) return
    await deleteQuestion(id)
    await fetchData()
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin - Questions</h1>
          <div>
            <button className="btn btn-ghost mr-2" onClick={beginAdd}>New</button>
            <button className="btn btn-primary" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied') }}>Copy Link</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Question Form */}
          <div className="col-span-1 card">
            <h3 className="font-semibold mb-3">Question Form</h3>
            <label className="text-sm text-slate-500">Question</label>
            <textarea 
              value={form.q} 
              onChange={(e) => setForm(f => ({...f, q:e.target.value}))} 
              className="w-full p-3 mt-2 rounded-md border" 
              rows={4} 
            />

            <div className="mt-4">
              <label className="text-sm text-slate-500">Options</label>
              <div className="flex flex-col gap-2 mt-2">
                {form.options.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      value={opt} 
                      onChange={(e) => setForm(f => ({...f, options: f.options.map((o,idx)=> idx===i?e.target.value:o)}))} 
                      className="flex-1 p-2 border rounded-md" 
                    />
                    <input 
                      type="radio" 
                      name="answer" 
                      checked={Number(form.answer)===i} 
                      onChange={()=> setForm(f=>({...f, answer:i}))} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {editing ? (
                <>
                  <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
                  <button className="btn btn-ghost" onClick={() => { setEditing(null); beginAdd(); }}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={handleAdd}>Add</button>
                  <button className="btn btn-ghost" onClick={() => beginAdd()}>Clear</button>
                </>
              )}
            </div>
          </div>

          {/* Questions List */}
          <div className="col-span-2">
            <h3 className="font-semibold mb-4">Questions</h3>
            {loading ? <div>Loading...</div> : (
              <div className="space-y-3">
                {questions.map((item, idx) => (
                  <motion.div 
                    key={item._id} 
                    initial={{opacity:0}} 
                    animate={{opacity:1}} 
                    className="p-4 bg-white rounded-xl shadow-sm flex justify-between items-start"
                  >
                    <div>
                      <div className="font-medium">{idx+1}. {item.questionText}</div>
                      <div className="text-sm text-slate-500 mt-2">
                        {item.options.map((o,i)=> (
                          <div key={i} className={`py-1 ${i===item.correctAnswerIndex? 'text-green-600 font-medium':'text-slate-600'}`}>
                            {String.fromCharCode(65+i)}. {o}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="btn btn-ghost" onClick={() => beginEdit(item)}>Edit</button>
                      <button className="btn btn-ghost text-red-600" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}
