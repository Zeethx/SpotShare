import React from 'react'
import { useNavigate } from 'react-router-dom';

function Confirmation() {
  const navigate = useNavigate();
  
  return (
    <div className="flex pt-[10vw] justify-center ">
    <div className=" p-8 rounded text-center">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">Submission Successful!</h1>
      <p className="text-gray-700 text-xl mb-6">
        Thank you for submitting your parking spot. We will review your submission and get back to you within <span className='font-bold'>24 hours</span>.
      </p>
      <p className="text-gray-600 text-xl">
        If you have any questions, feel free to <span className="text-primary-color cursor-pointer" onClick={() => navigate('/contact')}>contact our support team</span>.
      </p>
    </div>
  </div>
  )
}

export default Confirmation
