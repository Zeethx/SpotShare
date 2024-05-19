import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ConfirmReservation = () => {
  //   const { spotId } = useParams();
  //   const [spotDetails, setSpotDetails] = useState(null);
  const [vehicleReg, setVehicleReg] = useState("");

  //   useEffect(() => {
  //     const fetchSpotDetails = async () => {
  //       try {
  //         const response = await axios.get(`/api/parking-spots/${spotId}`);
  //         setSpotDetails(response.data);
  //       } catch (error) {
  //         console.error('Error fetching parking spot details:', error);
  //       }
  //     };

  //     fetchSpotDetails();
  //   }, [spotId]);

  //   if (!spotDetails) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="min-h-screen flex-col justify-center items-center mt-[7vw]">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Confirm Your Reservation for Spot
      </h2>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
          <div className="flex justify-between">
            {/* Left Section */}
            <div className="w-2/3 pr-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Booking Details</h3>
                <p>Parking at {/*{spotDetails.location}*/}</p>
                <div className="mt-2">
                  <p>
                    <span className="font-semibold">Arriving on: </span>
                    <p className="text-blue-600">
                      Today at 23:00
                    </p>
                  </p>
                  <p>
                    <span className="font-semibold">Leaving on: </span>
                    <p className="text-blue-600">
                      Tomorrow at 04:00
                    </p>
                  </p>
                  <p>
                    <span className="font-semibold">Duration: </span>5 hours
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Vehicle Information</h3>
                <p>
                  Your vehicle registration number will be shared with the
                  parking space owner/operator
                </p>
                <input
                  type="text"
                  placeholder="Enter your vehicle registration number"
                  className="border border-gray-300 rounded w-full p-2 mt-2"
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                />
                <p className="mt-2 text-red-600">
                  Your Reservation Cannot be Cancelled.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-1/3 pl-4">
              <div className="mb-6">
                <div className="border border-gray-300 rounded h-48 flex items-center justify-center">
                  <span>Photos</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="flex justify-between">
                  <span>Parking fee</span>
                  <span>CA$</span>
                </p>
                <p className="flex justify-between">
                  <span>
                    Transaction fee <span className="text-gray-500">(i)</span>
                  </span>
                  <span>CA$1.49</span>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between font-semibold">
                  <span>Final price</span>
                  <span>CA$</span>
                </p>
              </div>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReservation;
