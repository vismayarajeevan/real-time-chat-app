import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import ChatWindow from './pages/ChatWindow'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={ <LoginPage />} />
      <Route path='/chatwindow' element={<ChatWindow/>} />
    </Routes>
     
    
    </>
  )
}

export default App
