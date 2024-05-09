import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button className="left-10 text-black bg-gray-300
            px-14 py-2 rounded-lg shadow-md text-xl
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
            onClick={handleClick}>
      Back
    </button>
  )
}

export default BackButton