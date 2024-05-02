import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logo512.png" className="h-8" alt="SpotShare Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">SpotShare</span>
    </Link>
  )
}

export default Logo