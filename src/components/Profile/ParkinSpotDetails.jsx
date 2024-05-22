// src/pages/ListingDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../conf/axiosConfig";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ParkingSpotDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [formState, setFormState] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    // Fetch the current listing details from the server
    api
      .get(`/parking-space/${id}`)
      .then((response) => {
        setListing(response.data.data);
        setFormState(response.data.data); // Initialize the form state with the fetched data
        console.log("User data:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching listing details:", error);
      });
  }, [id]);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle changes to nested daysAvailable array
  const handleDaysChange = (index, field, value) => {
    const updatedDays = [...formState.daysAvailable];
    updatedDays[index][field] = value;
    setFormState({
      ...formState,
      daysAvailable: updatedDays,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the listing in the database
    api
      .put(`/parking-space/${id}`, formState)
      .then((response) => {
        console.log("Update successful:", response.data);
        alert("Listing updated successfully!");
        setIsEditMode(false); // Switch back to view mode after saving
      })
      .catch((error) => {
        console.error("Error updating listing details:", error);
        alert("Failed to update listing.");
      });
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 max-w-6xl w-full flex flex-col md:flex-row">
        <div className="w-full md:w-3/5">
          <h1 className="text-3xl font-semibold mb-6">{isEditMode ? (
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            formState.title
          )}</h1>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Description:</h2>
              {isEditMode ? (
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              ) : (
                <p className="text-gray-600">{formState.description}</p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Access Instructions:</h2>
              {isEditMode ? (
                <input
                  type="text"
                  name="accessInstructions"
                  value={formState.accessInstructions}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              ) : (
                <p className="text-gray-600">{formState.accessInstructions}</p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Address:</h2>
                <p className="text-gray-600">{formState.address}</p>
      
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Available Till:</h2>
              {isEditMode ? (
                <input
                  type="date"
                  name="availableTill"
                  value={formState.availableTill}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              ) : (
                <p className="text-gray-600">{formState.availableTill}</p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Days Available:</h2>
              {isEditMode ? (
                formState.daysAvailable.map((day, index) => (
                  <div key={index} className="mb-2">
                    <label className="block">
                      {day.day}
                      <div className="flex">
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
                          className="border p-2 w-full"
                        />
                      </div>
                    </label>
                  </div>
                ))
              ) : (
                <ul className="text-gray-600">
                  {formState.daysAvailable.map((day, index) => (
                    <li key={index}>{day.day}: {day.fromTime} - {day.toTime}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Is Available:</h2>
              {isEditMode ? (
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formState.isAvailable}
                  onChange={handleChange}
                  className="ml-2"
                />
              ) : (
                <p className="text-gray-600">{formState.isAvailable ? "Yes" : "No"}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 md:pl-8 mt-8 md:mt-0">
          <h2 className="text-xl font-semibold mb-4">Images:</h2>
          <Carousel responsive={responsive} className="rounded-lg overflow-hidden mb-8">
            {formState.spotImages.map((url, index) => (
              <div key={index} className="p-2">
                <img
                  src={url}
                  alt={`Spot ${index}`}
                  className="h-40 w-full object-contain rounded-lg"
                />
              </div>
            ))}
          </Carousel>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Price Per Day:</h2>
            {isEditMode ? (
              <input
                type="number"
                name="pricePerDay"
                value={formState.pricePerDay}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p className="text-gray-600">${formState.pricePerDay}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Price Per Hour:</h2>
            {isEditMode ? (
              <input
                type="number"
                name="pricePerHour"
                value={formState.pricePerHour}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p className="text-gray-600">${formState.pricePerHour}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Price Per Month:</h2>
            {isEditMode ? (
              <input
                type="number"
                name="pricePerMonth"
                value={formState.pricePerMonth}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p className="text-gray-600">${formState.pricePerMonth}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Spaces To Rent:</h2>
            {isEditMode ? (
              <input
                type="number"
                name="spacesToRent"
                value={formState.spacesToRent}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p className="text-gray-600">{formState.spacesToRent}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Vehicle Size:</h2>
            {isEditMode ? (
              <input
                type="text"
                name="vehicleSize"
                value={formState.vehicleSize}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p className="text-gray-600">{formState.vehicleSize}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Status:</h2>
      
              <p className="text-gray-600">{formState.status}</p>
            
          </div>
          {isEditMode && (
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Save Changes
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className="bg-gray-500 text-white p-2 rounded mt-4 ml-4"
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotDetails;
