import React from 'react'

export default function Header(){
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">LocalBiz</h1>
        <p className="text-sm text-gray-500">Apple-style minimal • Content for local businesses</p>
      </div>
      <div className="text-sm text-gray-500">Hyderabad • MVP</div>
    </header>
  )
}