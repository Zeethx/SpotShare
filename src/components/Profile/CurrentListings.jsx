import React from 'react';

const CurrentListings = ({ parkingSpots, handleParkingSpotClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingSpots.length > 0 ? (
                parkingSpots.map((spot) => (
                    <div
                        key={spot._id}
                        onClick={() => handleParkingSpotClick(spot._id)}
                        className={`p-2 ${
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
};

export default CurrentListings;