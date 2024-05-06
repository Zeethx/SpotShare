import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputField, Button } from "../";

function ParkingForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      dateTimeIn: new Date(),
      dateTimeOut: new Date(),
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className="mx-auto my-10 p-5 border rounded-lg shadow-lg max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center ">Find parking spaces</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Park at
          </label>
          <InputField placeholder="Enter a place or postcode" type="text" />

        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-4 lg:mb-0">
            <label className="block text-sm font-medium text-gray-700">
              From
            </label>  
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
            <label className="block text-sm font-medium text-gray-700">
              Until
            </label>
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
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              )}
            />
          </div>
        </div>

        <Button type="submit" text="Submit" 
        className="w-full bg-green-500 text-white p-2 rounded-md"/>
      </form>
    </div>
  );
}


export default ParkingForm;
