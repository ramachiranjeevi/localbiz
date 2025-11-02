import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatOutput({messages}){

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {messages.map((m, idx) => (
          <motion.div key={idx} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} className={`flex ${m.role==='assistant' ? 'justify-start' : 'justify-end'}`}>
            <div className={`chat-bubble ${m.role==='assistant' ? 'bg-white' : 'bg-slate-100'}`}>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">{m.text}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}