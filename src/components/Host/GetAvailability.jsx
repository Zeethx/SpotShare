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
  const [startDate, setStartDate] = useState(
    formData.availableTill ? new Date(formData.availableTill) : null
  );
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
      className="py-2 px-4 rounded border bg-white text-gray-700 font-semibold shadow-sm hover:shadow-md cursor-pointer text-center"
      onClick={onClick}
      ref={ref}
    >
      {formData.availableTill ? value : "Select Date"}
    </div>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateForm({ name: "availableTill", value: startDate.toISOString() })
    );
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
      daysOfWeek.forEach((day) => {
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
    <div className="min-h-screen pb-20 pt-6 flex flex-col items-center px-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary-black text-center mb-6">
          Set Availability
        </h2>
        <p className="lg:text-xl text-gray-700 text-center mb-8">
          Select an end date and specify your active days. Click on "Select
          Date" to set your duration.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4">
            <label className="text-lg lg:text-xl font-medium text-center">
              Set the date till your listing will be available
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                dispatch(
                  updateForm({
                    name: "availableTill",
                    value: date.toISOString(),
                  })
                );
              }}
              placeholderText="Select Start Date"
              customInput={<CustomInput />}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {daysOfWeek.slice(0, 6).map((day) => (
              <div key={day} className="w-full">
                <button
                  onClick={(e) => handleDayClick(day, e)}
                  className={`py-2 px-6 rounded border w-full text-center font-bold text-xl ${
                    editingDays.includes(day)
                      ? "border-primary-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
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
            <div className="w-full lg:col-span-3 flex justify-center">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <button
                  onClick={(e) => handleDayClick("sunday", e)}
                  className={`py-2 px-6 rounded border w-full text-center font-bold text-xl ${
                    editingDays.includes("sunday")
                      ? "border-primary-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  Sunday
                </button>
                {editingDays.includes("sunday") && (
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    <div className="col-span-3">
                      <TimeSelector
                        value={customTimes["sunday"].in}
                        onChange={handleTimeChange("sunday", "in")}
                      />
                    </div>
                    <span className="text-lg font-medium self-center text-center col-span-1">
                      to
                    </span>
                    <div className="col-span-3">
                      <TimeSelector
                        value={customTimes["sunday"].out}
                        onChange={handleTimeChange("sunday", "out")}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-4 lg:mt-0 ">
            <Button
              text={
                editingDays.length === daysOfWeek.length
                  ? "Deselect All"
                  : "Select All"
              }
              onClick={handleToggleAllDays}
              className="py-2 px-6 rounded bg-primary-black text-white font-bold text-xl w-full"
            />
          </div>
        </form>
      </div>
      <FormFooter
        text="Set Availability and Pricing: Step 2"
        to="/become-a-host/pricing"
        disabledCondition={!startDate || editingDays.length === 0}
        onNextClick={handleSubmit}
        className="mt-8"
      />
    </div>
  );
}

export default GetAvailability;
