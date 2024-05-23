// src/components/ParkingSpace/DaysAvailable.js
import React, { useState } from "react";

const DaysAvailable = ({ daysAvailable, setDaysAvailable, isEditMode }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [newDay, setNewDay] = useState("");

  const handleDaysChange = (index, field, value) => {
    const updatedDays = [...daysAvailable];
    updatedDays[index][field] = value;
    setDaysAvailable(updatedDays);
  };

  const handleRemoveDay = (index) => {
    const updatedDays = daysAvailable.filter((_, i) => i !== index);
    setDaysAvailable(updatedDays);
  };

  const handleAddDay = () => {
    if (!daysAvailable.some(day => day.day === newDay) && newDay !== "") {
      const newDayObj = { day: newDay, fromTime: "08:00", toTime: "18:00" };
      setDaysAvailable([...daysAvailable, newDayObj]);
      setNewDay("");
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Days Available:</h2>
      {isEditMode ? (
        <>
          {daysAvailable.map((day, index) => (
            <div key={index} className="mb-2">
              <label className="block">
                <div className="flex items-center">
                  <span className="w-1/4">{day.day}</span>
                  <input
                    type="time"
                    name="fromTime"
                    value={day.fromTime}
                    onChange={(e) => handleDaysChange(index, "fromTime", e.target.value)}
                    className="border p-2 w-full mr-2"
                  />
                  <input
                    type="time"
                    name="toTime"
                    value={day.toTime}
                    onChange={(e) => handleDaysChange(index, "toTime", e.target.value)}
                    className="border p-2 w-full mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(index)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </label>
            </div>
          ))}
          {daysAvailable.length < 7 && (
            <>
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="border p-2 w-full mb-2"
              >
                <option value="" disabled>Select a day</option>
                {daysOfWeek
                  .filter(day => !daysAvailable.some(d => d.day === day))
                  .map((day, i) => (
                    <option key={i} value={day}>{day}</option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddDay}
                className="bg-green-500 text-white p-2 rounded mt-4"
              >
                Add Day
              </button>
            </>
          )}
        </>
      ) : (
        <ul className="text-gray-600">
          {daysAvailable.map((day, index) => (
            <li key={index}>{day.day}: {day.fromTime} - {day.toTime}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DaysAvailable;
