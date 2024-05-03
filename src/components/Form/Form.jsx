import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Container from "../Container/Container";
import InputField from "./Input";

function SimpleParkingForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      dateTimeIn: new Date(),
      dateTimeOut: new Date(),
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center ">Find parking spaces</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Park at
          </label>
          <InputField placeholder="Enter a place or postcode" />

        </div>
        <div className="flex items-center justify-between">
          <div>
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
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Show parking spaces
        </button>
      </form>
    </div>
  );
}

function Form() {
  return (
    <div>
      <Container>
        <SimpleParkingForm />
      </Container>
    </div>
  );
}

export default Form;
