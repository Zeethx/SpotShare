import React, { useState } from "react";
import { Button, FormFooter, TimeSelector } from "..";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GetAvailability() {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [editingDays, setEditingDays] = useState([]); // Tracks which days are being edited for time setting
  const [startDate, setStartDate] = useState(new Date());
  const [customTimes, setCustomTimes] = useState({
    monday: { in: "00:00", out: "23:59" },
    tuesday: { in: "00:00", out: "23:59" },
    wednesday: { in: "00:00", out: "23:59" },
    thursday: { in: "00:00", out: "23:59" },
    friday: { in: "00:00", out: "23:59" },
    saturday: { in: "00:00", out: "23:59" },
    sunday: { in: "00:00", out: "23:59" },
  });
  const [dateSelected, setDateSelected] = useState(false);
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="py-2 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full " onClick={onClick} ref={ref}>
      {dateSelected ? value : 'Set date'}
    </div>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Availability:", customTimes);
  };

  const handleDayClick = (day) => {
    const newEditingDays = editingDays.includes(day)
      ? editingDays.filter((d) => d !== day)
      : [...editingDays, day];
    setEditingDays(newEditingDays);
  };
  const handleTimeChange = (day, timeType) => (event) => {
    setCustomTimes((prevTimes) => ({
      ...prevTimes,
      [day]: { ...prevTimes[day], [timeType]: event.target.value },
    }));
  };
  const handleToggleAllDays = () => {
    if (editingDays.length === daysOfWeek.length) {
      setEditingDays([]);
    } else {
      setEditingDays(daysOfWeek);
    }
  };

  return (
    <div className="lg:pt-[7vw] pb-[10vw] h:screen py-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="w-full lg:w-1/2 pr-2 ">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary-black p-2">
              Set Availability
            </h2>
            <p className="text-xl text-gray-700">
              Set the availability schedule and start date.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/2 space-y-4 items-center mt-10">
          <div className="flex flex-col lg:flex-row justify-between w-full my-5">
            <div>

              <DatePicker
                selected={startDate}
                onChange={(date) => {setStartDate(date); setDateSelected(true);}}
                placeholderText="Select date"
                customInput={<CustomInput />}
              />
            </div>
            <div className="text-lg font-medium bold mt-5 lg:mt-0">
            <Button
              text={
                editingDays.length === daysOfWeek.length
                  ? "Deselect All Days"
                  : "Select All Days"
              }
              onClick={handleToggleAllDays}
              className="py-2 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl"
            />
            </div>
          </div>
          {Object.keys(customTimes).map((day) => (
            <div key={day} className="w-full">
              <Button
                text={day.charAt(0).toUpperCase() + day.slice(1)}
                onClick={() => handleDayClick(day)}
                className={`py-2 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full ${
                  editingDays.includes(day)
                    ? "border-2 border-black bg-gray-100"
                    : "border-gray-500"
                }`}
              />
              {editingDays.includes(day) && (
                <div className="grid grid-cols-7 gap-2 mt-2">
                <div className="col-span-3">
                  <TimeSelector
                    value={customTimes[day].in}
                    onChange={handleTimeChange(day, "in")}

                  />
                  </div>
                  <span className="text-lg font-medium self-center text-center col-span-1">
                    to
                  </span>
                  <div className="col-span-3">
                  <TimeSelector
                    value={customTimes[day].out}
                    onChange={handleTimeChange(day, "out")}

                  />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
      <FormFooter
        text="Set Availability and Pricing: Step 2"
        to="/become-a-host/pricing"
      />
    </div>
  );
}

export default GetAvailability;
