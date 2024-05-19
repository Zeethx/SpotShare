import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
import { InputField, Button } from "../";
import conf from "../../conf/conf"; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';

const libraries = ["places"];

function ParkingForm({ onAddressChange }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      dateTimeIn: new Date(),
      dateTimeOut: new Date(),
    },
  });

  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    if (onAddressChange) {
      onAddressChange(data.location);
    }
    navigate('/Find');
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const address = place.formatted_address;
        if (onAddressChange) {
          onAddressChange(address);
        }
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={conf.googleMapsApiKey} libraries={libraries}>
      <div className="mx-auto my-10 p-5 border rounded-lg shadow-lg max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700 text-center">Find parking spaces</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Park at</label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Enter a place or postcode"
                    {...field}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                  />
                </Autocomplete>
              )}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="mb-4 lg:mb-0">
              <label className="block text-sm font-medium text-gray-700">From</label>
              <Controller
                control={control}
                name="dateTimeIn"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="mt-1 w-full p-2 justify-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Until</label>
              <Controller
                control={control}
                name="dateTimeOut"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                  />
                )}
              />
            </div>
          </div>

          <Button type="submit" text="Submit" className="w-full bg-primary-color text-white p-2 rounded-md" />
        </form>
      </div>
    </LoadScript>
  );
}

export default ParkingForm;
