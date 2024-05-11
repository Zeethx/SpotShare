import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-0.5 rtl:space-x-reverse">
        <img src="/images/location.svg" className="h-8" alt="SpotShare Logo" />
        <span className="self-center text-2xl font-semibold font-freeman whitespace-nowrap text-primary-color">SpotShare</span>
    </Link>
  )
}

export default Logo