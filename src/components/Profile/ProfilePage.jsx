// src/pages/ProfilePage.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../conf/axiosConfig";
import CurrentListings from "./CurrentListings";
import ParkingHistory from "./ParkingHistory";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [parkingSpots, setParkingSpots] = useState([]);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    api
      .get("/users/parking-spaces")
      .then((response) => {
        setParkingSpots(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching parking spaces:", error);
      });
    }, []);

  const handleProfilePictureSubmit = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePhoto", file);

      api
        .post("/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error(
            "Error updating profile picture:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      console.error("No file selected");
    }
  };

  const handleProfilePictureClick = () => {
    fileInput.current.click();
  };

  const handleAdminDashboardClick = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex md:items-center 3xl:items-start justify-center p-4">
      <div className="p-4 md:p-8 rounded-lg shadow-md max-w-[80vw] w-full relative">
        {user.role === "admin" && (
          <div className="absolute top-28 right-4 md:top-16 md:right-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl"
              onClick={handleAdminDashboardClick}
            >
              Admin Dashboard
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 mb-6">
          <div
            className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-full overflow-hidden cursor-pointer relative"
            onClick={handleProfilePictureClick}
          >
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 text-white">
              Change Avatar
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl text-slate-900 capitalize font-semibold font-freeman">
              {user.fullName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        {parkingSpots.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              My Listings
            </h2>
            <p className="text-gray-600 mb-4">
              View and manage your parking listings.
            </p>
            <CurrentListings parkingSpots={parkingSpots} />
          </div>
        )}
        <ParkingHistory />
        <form onSubmit={handleProfilePictureSubmit} className="hidden">
          <input
            type="file"
            ref={fileInput}
            onChange={handleProfilePictureSubmit}
            className="hidden"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
