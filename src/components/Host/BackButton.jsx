import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button className="left-10 text-black bg-gray-300
            px-6 sm:px-6 md:px-8 lg:px-14 py-4 md:py-2 rounded-lg shadow-md text-sm sm:text-base md:text-lg lg:text-xl
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
            onClick={handleClick}>
      Back
    </button>
  )
}

export default BackButton