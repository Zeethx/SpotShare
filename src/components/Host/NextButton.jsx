import React from 'react'
import { useNavigate } from 'react-router-dom'

function NextButton({ to='/become-a-host', disabledCondition=false, onNextClick}) {
  const navigate = useNavigate()

  // navigate to "to" path if no onNextClick is provided
  const handleClick = () => {
    navigate(to)
  }
    

  return (
    <button className="absolute bottom-10 right-10 bg-primary-color text-white 
            px-14 py-2 rounded-lg shadow-md text-xl
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
            onClick={onNextClick || handleClick} disabled={disabledCondition}>
      Next
    </button>
      
  )
}

export default NextButton