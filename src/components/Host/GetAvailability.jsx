import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateForm } from "../../store/formReducer";
import { Button, FormFooter, TimeSelector } from "..";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GetAvailability() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [editingDays, setEditingDays] = useState(formData.daysAvailable || []);
  const [startDate, setStartDate] = useState( formData.availableTill ? new Date(formData.availableTill) : null);
  const [customTimes, setCustomTimes] = useState(
    formData.customTimes || {
      monday: { in: "00:00", out: "23:59" },
      tuesday: { in: "00:00", out: "23:59" },
      wednesday: { in: "00:00", out: "23:59" },
      thursday: { in: "00:00", out: "23:59" },
      friday: { in: "00:00", out: "23:59" },
      saturday: { in: "00:00", out: "23:59" },
      sunday: { in: "00:00", out: "23:59" },
    }
  );

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      className="py-1 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      {formData.availableTill ? value : "Set Date"}
    </div>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateForm({ name: "availableTill", value: startDate.toISOString() }));
    dispatch(updateForm({ name: "customTimes", value: customTimes }));
    dispatch(updateForm({ name: "daysAvailable", value: editingDays }));
    navigate("/become-a-host/pricing");
  };

  const handleDayClick = (day, e) => {
    e.preventDefault(); // Prevent default button behavior
    const newEditingDays = editingDays.includes(day)
      ? editingDays.filter((d) => d !== day)
      : [...editingDays, day];
    setEditingDays(newEditingDays);
    console.log("Editing Days:", newEditingDays);
    if (!customTimes[day]) {
      setCustomTimes((prevTimes) => ({
        ...prevTimes,
        [day]: { in: "00:00", out: "23:59" },
      }));
    }
  };

  const handleTimeChange = (day, timeType) => (event) => {
    setCustomTimes((prevTimes) => ({
      ...prevTimes,
      [day]: { ...prevTimes[day], [timeType]: event.target.value },
    }));
  };

  const handleToggleAllDays = (e) => {
    e.preventDefault(); // Prevent default button behavior
    if (editingDays.length === daysOfWeek.length) {
      setEditingDays([]);
    } else {
      setEditingDays(daysOfWeek);
      daysOfWeek.forEach(day => {
        if (!customTimes[day]) {
          setCustomTimes((prevTimes) => ({
            ...prevTimes,
            [day]: { in: "00:00", out: "23:59" },
          }));
        }
      });
    }
  };

  return (
    <div className="lg:pt-[7vw] pb-[10vw] h:screen my-20 lg:my-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="w-full lg:w-1/2 pr-2 ">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary-black p-2">
              Set Availability
            </h2>
            <p className="lg:text-xl text-gray-700">
              Select a start date and specify your active days. Click "Set Date"
              to pick your start date.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/2 space-y-4 items-center mt-2">
          <div className="flex flex-col lg:flex-row justify-between w-full my-2">
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  dispatch(updateForm({ name: "availableTill", value: date.toISOString() }));
                }}
                placeholderText="Select Start Date"
                customInput={<CustomInput />}
              />
            </div>
            <div className="text-lg font-medium bold mt-5 lg:mt-0">
              <Button
                text={
                  editingDays.length === daysOfWeek.length
                    ? "Deselect All"
                    : "Select All"
                }
                onClick={handleToggleAllDays}
                className="py-1 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl"
              />
            </div>
          </div>
          {daysOfWeek.map((day) => (
            <div key={day} className="w-full">
              <Button
                text={day.charAt(0).toUpperCase() + day.slice(1)}
                onClick={(e) => handleDayClick(day, e)}
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
        disabledCondition={!startDate || editingDays.length === 0}
        onNextClick={handleSubmit}
      />
    </div>
  );
}

export default GetAvailability;
