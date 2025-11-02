import React, {useState} from 'react'
import Header from './components/Header'
import InputPanel from './components/InputPanel'
import ChatOutput from './components/ChatOutput'
import Footer from './components/Footer'

export default function App(){
  const [messages, setMessages] = useState([])

  const append = (m) => setMessages(prev => [...prev, m])

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl">
        <Header />
        <div className="mt-8 grid grid-cols-1 gap-6">
          <div className="card p-6">
            <InputPanel onResult={(text)=>append({role:'assistant', text})} />
          </div>
          <div className="card p-6">
            <ChatOutput messages={messages} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}