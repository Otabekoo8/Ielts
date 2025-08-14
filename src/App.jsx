import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import StudentTest from './pages/StudentTest'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentTest />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </div>
  )
}