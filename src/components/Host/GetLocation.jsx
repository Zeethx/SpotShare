import React from 'react'
import NextButton from './NextButton'

function GetLocation() {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap lg:h-screen">
        <div className="w-full lg:w-1/2 pr-2">
            <div className="flex flex-col items-center justify-center pt-[7vw]">
                <h1 className="text-6xl font-extrabold text-primary-color items-start">Start Sharing Your Space</h1>
            </div>
            <div className='flex flex-col items-center justify-center h-1/2'>
                <h2 className="text-4xl font-semibold text-primary-black p-2">Location</h2>
                <p className="text-xl text-gray-700">Enter the exact address or drag the pin on the map to your spot's location.</p>
            </div>
        </div>
        <div className="w-full lg:w-1/2">
            <div className="flex flex-col items-center justify-center h-full p-4">
                <img src="images/Empty_Driveway.jpg" className="w-full" alt="Map" />
            </div>
        </div>
        <NextButton to="/become-a-host/spot-details" />
    </div>
  )
}

export default GetLocation