import React, { useState, useRef } from 'react';
import NextButton from './NextButton';
import { InputField, Button } from '../';

function GetSpotDetails() {
  const [spotType, setSpotType] = useState('');
  const [vehicleSize, setVehicleSize] = useState('');
  const [numberOfSpaces, setNumberOfSpaces] = useState(1);

  const spotTypeRef = useRef();
  const vehicleSizeRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the spot details to the database
    const spotDetails = {
      spotType: spotTypeRef.current.value,
      vehicleSize: vehicleSizeRef.current.value,
      numberOfSpaces
    };
    console.log(spotDetails);
    // Send a POST request to the server
    // try {
    //     const response = await axios.post('/api/spots', spotDetails);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }

  };

  return (
    <div className="flex flex-col lg:flex-row flex-wrap lg:h-screen">
        <div className="w-full lg:w-1/2 pr-2">
            <div className="flex flex-col items-center justify-center pt-[7vw]">
                <h1 className="text-6xl font-extrabold text-primary-color items-start">Start Sharing Your Space</h1>
            </div>
            <div className='flex flex-col items-center justify-center h-1/2'>
                <h2 className="text-4xl font-semibold text-primary-black p-2">Spot Details</h2>
                <p className="text-xl text-gray-700">Provide essential details about your spot.</p>
            </div>
        </div>
        <div className="w-full lg:w-1/2 px-4 py-6 flex justify-center pt-[7vw]">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <InputField
                    ref={spotTypeRef}
                    type="text"
                    placeholder="Enter the type of spot"
                    value={spotType}
                    onChange={e => setSpotType(e.target.value)}
                />
                <InputField
                    ref={vehicleSizeRef}
                    type="text"
                    placeholder="Suitable vehicle size"
                    value={vehicleSize}
                    onChange={e => setVehicleSize(e.target.value)}
                />
                <div>
                    <label htmlFor="numberOfSpaces" className="block text-sm font-medium text-gray-700">How many spaces are available to rent out?</label>
                    <div className="flex items-center space-x-2">
                        <Button type="button" text="-" onClick={() => setNumberOfSpaces(Math.max(1, numberOfSpaces - 1))} className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm"/>
                        <span>{numberOfSpaces}</span>
                        <Button type="button" text="+" onClick={() => setNumberOfSpaces(numberOfSpaces + 1)} className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm"/>
                    </div>
                </div>
            </form>
                <NextButton to="/become-a-host/spot-details" />

        </div>
    </div>
  )
}

export default GetSpotDetails;
