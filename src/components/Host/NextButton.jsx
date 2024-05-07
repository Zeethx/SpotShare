import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../'

function NextButton({ to='/become-a-host' }) {
    const navigate = useNavigate()

    const handleNext = () => {
        navigate(to)
    }

  return (
    <Button text="Next" className="absolute bottom-10 right-10 bg-primary-color text-white 
            px-14 py-2 rounded-lg shadow-md text-xl" onClick={handleNext} />
  )
}

export default NextButton