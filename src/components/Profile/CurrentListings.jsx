import React from "react";
import { useNavigate } from "react-router-dom";

function CurrentListings({ parkingSpots }) {
  const navigate = useNavigate();
  const handleParkingSpotClick = (id) => {
    navigate("/view-listings:id");
  };
  return (
    <div className="flex flex-col md:flex-row flex-wrap">
      {parkingSpots.length > 0 ? (
        parkingSpots.map((spot) => (
          <div
            key={spot._id}
            onClick={handleParkingSpotClick}
            className={`p-2 w-full sm:w-1/2 lg:w-1/3 ${
              spot.status === "Pending"
                ? "bg-yellow-200"
                : spot.status === "Approved"
                ? "bg-green-200"
                : "bg-red-200"
            }`}
          >
            <div className="p-4 bg-gray-100 hover:bg-gray-400 cursor-pointer shadow rounded flex flex-col lg:flex-row">
              <div className="rounded overflow-hidden max-h-40 w-auto flex justify-center">
                <img
                  src={spot.spotImages}
                  alt={spot.title}
                  className="w-full max-w-20 h-20 object-cover rounded"
                />
              </div>
              <div className="flex flex-col items-start pl-5">
                <h3 className="text-lg font-semibold text-black capitalize">
                  {spot.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {spot.address.split(",").slice(0, 2).join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Confirmed Reservations: {spot.reservations.length}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 w-full">
          No parking history available.
        </p>
      )}
    </div>
  );
}

export default CurrentListings;
