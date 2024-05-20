import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../";
import conf from "../../conf/conf"; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';

const libraries = ["places"];

// Function to round up time to the next 15-minute interval
const roundUpTime = (date) => {
  const minutes = 15;
  const ms = 1000 * 60 * minutes; // convert minutes to ms
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

function ParkingForm({ onAddressChange }) {
  const roundedNow = roundUpTime(new Date());
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      location: "",
      dateTimeIn: roundedNow,
      dateTimeOut: new Date(roundedNow.getTime() + 3600000), // Default to 1 hour later
    },
  });

  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  const location = watch("location");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const dateTimeIn = watch("dateTimeIn");
  const dateTimeOut = watch("dateTimeOut");

  const onSubmit = (data) => {
    if (isAddressValid) {
      if (onAddressChange) {
        onAddressChange(data.location);
      }
      navigate('/Find', { state: { address: data.location, dateTimeIn: data.dateTimeIn, dateTimeOut: data.dateTimeOut } });
    } else {
      alert("Please select a valid address from the dropdown.");
    }
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const address = place.formatted_address;
        setValue("location", address); // Update the form value for location
        setIsAddressValid(true); // Mark the address as valid
        if (onAddressChange) {
          onAddressChange(address);
        }
      } else {
        setIsAddressValid(false); // Mark the address as invalid
      }
    }
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={conf.googleMapsApiKey}
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
    >
      <div className="mx-auto my-10 p-5 border rounded-lg shadow-lg max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700 text-center">Find parking spaces</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Park at</label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Enter a place or postcode"
                    {...field}
                    className={`mt-1 w-full p-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color`}
                  />
                </Autocomplete>
              )}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="mb-4 lg:mb-0">
              <label className="block text-sm font-medium text-gray-700">From</label>
              <Controller
                control={control}
                name="dateTimeIn"
                rules={{
                  validate: {
                    notPastDate: value => value >= new Date() || "Date cannot be in the past",
                    beforeDateTimeOut: value => value < dateTimeOut || "'From' date must be before 'To' date"
                  }
                }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      setValue("dateTimeOut", new Date(date.getTime() + 3600000)); // Ensure 'To' date is always at least 1 hour later
                      field.onChange(date);
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    className="mt-1 w-full p-2 justify-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                  />
                )}
              />
              {errors.dateTimeIn && <p className="text-red-500 text-sm">{errors.dateTimeIn.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Until</label>
              <Controller
                control={control}
                name="dateTimeOut"
                rules={{
                  validate: {
                    afterDateTimeIn: value => value > dateTimeIn || "'To' date must be after 'From' date"
                  }
                }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={dateTimeIn}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                  />
                )}
              />
              {errors.dateTimeOut && <p className="text-red-500 text-sm">{errors.dateTimeOut.message}</p>}
            </div>
          </div>

          <Button type="submit" text="Submit" className={`w-full bg-primary-color text-white p-2 rounded-md ${!isAddressValid ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!isAddressValid} />
        </form>
      </div>
    </LoadScriptNext>
  );
}

export default ParkingForm;
