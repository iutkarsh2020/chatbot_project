import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatContainer } from "./components/chat-container"

function App() {

  return (
    <>
      <div className="bg-red-100">
        hi
        <ChatContainer />
      </div>
      
    </>
  )
}

export default App
