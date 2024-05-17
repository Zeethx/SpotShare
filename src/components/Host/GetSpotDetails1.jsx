import React, {useState, useEffect} from 'react'
import { Button, InputField, FormFooter } from '../'
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../../store/formReducer';

function GetSpotDetails1({setStep}) {
    const formData = useSelector((state) => state.form);
    const dispatch = useDispatch();

    const [spotType, setSpotType] = useState(formData.typeOfSpot || '');
    const [vehicleSize, setVehicleSize] = useState(formData.vehicleSize || '');
    const [spacesToRent, setSpacesToRent] = useState(formData.spacesToRent || 1);
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };

    useEffect(() => {
      dispatch(updateForm({ name: 'typeOfSpot', value: spotType }));
      dispatch(updateForm({ name: 'vehicleSize', value: vehicleSize }));
      dispatch(updateForm({ name: 'spacesToRent', value: spacesToRent }));
    }, [spotType, vehicleSize, spacesToRent, dispatch]);

  return (
    
    <div className="w-full lg:w-1/2 mb-20">
    <form className="w-full p-8" onSubmit={handleSubmit}>
      <div className="mb-4 md:mb-10">
        <label className="text-xl lg:text-2xl font-bold">
          Type of Spot
        </label>
        <div className="flex justify-between mt-2 flex-wrap lg:flex-nowrap">
          {["Driveway", "Garage", "Street"].map((type) => (
            <Button
              key={type}
              type="button"
              text={type}
              onClick={() => {
                setSpotType(type);
              }}
              className={`py-2 lg:py-4 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full mr-2 my-1 lg:my-0 ${
                spotType === type
                  ? "border-2 border-black bg-gray-100"
                  : "border-gray-500"
              }`}
            />

          ))}
        </div>
      </div>
      <div className="mb-4 md:mb-10">
        <label className="text-xl lg:text-2xl font-bold">
          What size vehicle can your space accommodate?
        </label>
        <div className="flex justify-between mt-2 flex-wrap lg:flex-nowrap">
          {["Small", "Medium", "Large", "Van/Minibus"].map((size) => (
            <Button
              key={size}
              type="button"
              text={size}
              onClick={() => setVehicleSize(size)}
              className={`py-2 lg:py-4 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full mr-2 my-1 lg:my-0 ${
                vehicleSize === size
                  ? "border-2 border-black bg-gray-100"
                  : "border-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mb-4 md:mb-10">
        <label className="text-xl lg:text-2xl font-bold">
          How many spaces are available to rent out?
        </label>
        <div className="flex items-center mt-2 space-x-2">
          <Button
            type="button"
            text="-"
            onClick={() =>
              setSpacesToRent(Math.max(1, spacesToRent - 1))
            }
            className="px-4 lg:px-6 py-2 lg:py-4 border rounded bg-gray-200 text-xl font-bold"
          />
          <InputField
            type="text"
            className="w-12 py-2 lg:py-4 px-4 text-center text-xl font-bold border-0 shadow-none"
            readOnly
            value={spacesToRent}
          />
          <Button
            type="button"
            text="+"
            onClick={() => setSpacesToRent(spacesToRent + 1)}
            className="px-4 lg:px-6 py-2 lg:py-4 border rounded bg-gray-200 text-xl font-bold"
          />
        </div>
      </div>
    </form>
    <FormFooter text="Start Sharing Your Space: Step 2" to="/become-a-host/spot-details" disabledCondition={ !vehicleSize || !spotType } onNextClick={()=> setStep(2)} />
  </div>
  )
}

export default GetSpotDetails1