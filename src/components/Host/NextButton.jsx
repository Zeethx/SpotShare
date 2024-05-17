import React from 'react'
import { useNavigate } from 'react-router-dom'

function NextButton({ to='/become-a-host', disabledCondition=false, onNextClick}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  return (
    <button className="right-10 bg-primary-color text-white 
            px-6 sm:px-6 md:px-8 lg:px-14 py-4 md:py-2 rounded-lg shadow-md text-sm sm:text-base md:text-lg lg:text-xl
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
            onClick={onNextClick || handleClick} disabled={disabledCondition}>
      Next
    </button>
  )
}

export default NextButton