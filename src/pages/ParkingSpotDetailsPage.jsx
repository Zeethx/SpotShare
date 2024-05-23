// src/pages/ParkingSpotDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../conf/axiosConfig";
import FormField from "../components/ParkingSpace/FormField";
import FormTextArea from "../components/ParkingSpace/FormTextArea";
import DaysAvailable from "../components/ParkingSpace/DaysAvailable";
import { ImageCarousel, Container } from "../components";
import DeleteModal from "../components/ParkingSpace/DeleteModal";

const ParkingSpotDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [formState, setFormState] = useState({
    daysAvailable: [],
    spotImages: [],
    reservations: [],
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/parking-space/${id}`)
      .then((response) => {
        const data = response.data.data;
        setListing(data);
        setFormState({
          ...data,
          daysAvailable: data.daysAvailable || [],
          spotImages: data.spotImages || [],
          reservations: data.reservations || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching listing details:", error);
      });
  }, [id]);

  const handleDeleteParkingSpot = async () => {
    try {
      await api.delete(`/parking-space/${id}/remove`);
      alert("Parking spot deleted successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to delete parking spot: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/parking-space/${id}/update`, formState)
      .then((response) => {
        console.log("Update successful:", response.data.message);
        alert("Listing updated successfully!");
        setIsEditMode(false);
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
    <Container>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-8">
        <div className="p-6 md:flex">
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {isEditMode ? (
                    <input
                      type="text"
                      name="title"
                      value={formState.title}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    formState.title
                  )}
                </h1>
                <div className="flex space-x-2">
                  {isEditMode && (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Save Changes
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`p-2 rounded ${
                      isEditMode ? "bg-gray-500" : "bg-yellow-500"
                    } text-white`}
                  >
                    {isEditMode ? "Cancel" : "Edit"}
                  </button>
                </div>
              </div>
              <FormTextArea
                label="Description:"
                name="description"
                value={formState.description}
                onChange={handleChange}
                disabled={!isEditMode}
              />
              <FormField
                label="Access Instructions:"
                name="accessInstructions"
                value={formState.accessInstructions}
                onChange={handleChange}
                disabled={!isEditMode}
              />
              <FormField
                label="Address:"
                name="address"
                value={formState.address}
                onChange={handleChange}
                disabled
              />
              <FormField
                label="Available Till:"
                name="availableTill"
                type="date"
                value={
                  isEditMode
                    ? formState.availableTill
                    : listing.availableTill.split("T")[0]
                }
                onChange={handleChange}
                disabled={!isEditMode}
              />
              <DaysAvailable
                daysAvailable={formState.daysAvailable}
                setDaysAvailable={(days) =>
                  setFormState({ ...formState, daysAvailable: days })
                }
                isEditMode={isEditMode}
              />
              <div className="flex items-center mb-4">
                <label className="text-xl font-semibold mr-4">
                  Is Available:
                </label>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formState.isAvailable}
                  onChange={handleChange}
                  className={`${
                    isEditMode ? "cursor-pointer" : "cursor-default"
                  }`}
                  disabled={!isEditMode}
                />
              </div>
            </form>
          </div>
          <div className="md:w-1/3 md:pl-6 mt-8 md:mt-0">
            <ImageCarousel images={listing.spotImages} />
            <FormField
              label="Price Per Day:"
              name="pricePerDay"
              type="number"
              value={formState.pricePerDay}
              onChange={handleChange}
              disabled={!isEditMode}
            />
            <FormField
              label="Price Per Hour:"
              name="pricePerHour"
              type="number"
              value={formState.pricePerHour}
              onChange={handleChange}
              disabled={!isEditMode}
            />
            <FormField
              label="Price Per Month:"
              name="pricePerMonth"
              type="number"
              value={formState.pricePerMonth}
              onChange={handleChange}
              disabled={!isEditMode}
            />
            <FormField
              label="Spaces To Rent:"
              name="spacesToRent"
              type="number"
              value={formState.spacesToRent}
              onChange={handleChange}
              disabled={!isEditMode}
            />
            <FormField
              label="Vehicle Size:"
              name="vehicleSize"
              value={formState.vehicleSize}
              onChange={handleChange}
              disabled={!isEditMode}
            />
            <FormField
              label="Status:"
              name="status"
              value={formState.status}
              onChange={handleChange}
              disabled={!isEditMode}
            />
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white p-2 rounded mt-4 w-full"
            >
              Delete Parking Spot
            </button>
            {formState.reservations.length > 0 && (
              <button
                type="button"
                onClick={() => navigate(`/reservations/${id}`)}
                className="bg-green-500 text-white p-2 rounded mt-4 w-full"
              >
                View Reservations
              </button>
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteParkingSpot}
      >
        <p>Are you sure you want to delete this parking spot?</p>
      </DeleteModal>
    </Container>
  );
};

export default ParkingSpotDetails;
