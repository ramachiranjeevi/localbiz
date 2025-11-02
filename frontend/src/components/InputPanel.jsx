import React, {useState} from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function InputPanel({onResult}){
  const [business, setBusiness] = useState('Yoga Teacher')
  const [contentType, setContentType] = useState('Instagram Post')
  const [tone, setTone] = useState('Friendly')
  const [language, setLanguage] = useState('English')
  const [lengthPref, setLengthPref] = useState('Short')
  const [details, setDetails] = useState('target: beginners, offer: 20% off, city: Hyderabad')
  const [loading, setLoading] = useState(false)

  async function handleGenerate(e){
    e.preventDefault()
    setLoading(true)
    try{
      const payload = { business, contentType, tone, language, details, lengthPref }
      const r = await axios.post('/api/generate', payload)
      onResult(r.data.output)
    }catch(err){
      onResult('Error: '+(err.response?.data?.detail || err.message))
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select value={business} onChange={e=>setBusiness(e.target.value)} className="input-select">
          <option>Yoga Teacher</option>
          <option>Tutor</option>
          <option>Beauty Salon</option>
          <option>Gym</option>
          <option>Cafe</option>
          <option>Real Estate Agent</option>
          <option>Hardware Shop</option>
          <option>Other</option>
        </select>

        <select value={contentType} onChange={e=>setContentType(e.target.value)} className="input-select">
          <option>Instagram Post</option>
          <option>WhatsApp Message</option>
          <option>Reel Script</option>
          <option>30-day Content Calendar</option>
          <option>Ad Copy</option>
        </select>

        <select value={tone} onChange={e=>setTone(e.target.value)} className="input-select">
          <option>Friendly</option>
          <option>Professional</option>
          <option>Motivational</option>
          <option>Salesy</option>
          <option>Funny</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select value={language} onChange={e=>setLanguage(e.target.value)} className="input-select">
          <option>English</option>
          <option>Hindi</option>
          <option>Telugu</option>
          <option>Tamil</option>
          <option>Marathi</option>
          <option>Kannada</option>
          <option>Gujarati</option>
          <option>Punjabi</option>
          <option>Malayalam</option>
        </select>

        <select value={lengthPref} onChange={e=>setLengthPref(e.target.value)} className="input-select">
          <option>Short</option>
          <option>Medium</option>
          <option>Long</option>
        </select>

        <div className="text-sm text-gray-500 flex items-center">Tip: keep details concise (audience, offer, city)</div>
      </div>

      <textarea value={details} onChange={e=>setDetails(e.target.value)} className="input-area w-full" rows={3}></textarea>

      <div className="flex items-center justify-end">
        <motion.button whileTap={{scale:0.98}} className="button-primary" disabled={loading}>{loading? 'Generating...':'Generate'}</motion.button>
      </div>
    </form>
  )
}