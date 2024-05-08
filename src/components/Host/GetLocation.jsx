import React, { useState } from 'react'
import NextButton from './NextButton'
import {Map} from '../'

function GetLocation() {
  const [address, setAddress] = useState("");

  const handleAddressChange = (address) => {
    setAddress(address);
  };

  return (
    <div className="h-screen">
      <div className="text-center lg:pt-[7vw] pt-[20vw]">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-primary-color items-start mb-6">
          Start Sharing Your Space
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full lg:w-1/2 pr-2">
          <div className="flex flex-col items-center justify-center ">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary-black p-2">Location</h2>
                <p className="text-xl text-gray-700">Enter the exact address or drag the pin on the map to your spot's location.</p>
            </div>
        </div>
        <div className="w-full lg:w-1/2">
            <div className="flex flex-col items-center justify-center h-full p-4">
                <Map onAddressChange={handleAddressChange}/>
            </div>
        </div>
        <NextButton to="/become-a-host/spot-details" disabledCondition={!address} />
    </div>
    </div>
  )
}

export default GetLocation