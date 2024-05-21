import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../conf/axiosConfig"; // Ensure this is the correct path
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const ConfirmReservation = () => {
  const { spotId } = useParams();
  const location = useLocation();
  const [spotDetails, setSpotDetails] = useState(null);
  const [vehicleReg, setVehicleReg] = useState("");

  const navigate = useNavigate();
  // Get dateTimeIn and dateTimeOut from query parameters
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const queryParams = getQueryParams(location.search);
  const dateTimeIn = new Date(queryParams.get("dateTimeIn"));
  const dateTimeOut = new Date(queryParams.get("dateTimeOut"));

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const response = await api.get(`/parking-space/${spotId}`);
        setSpotDetails(response.data.data);
        console.log("Parking spot details fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching parking spot details:", error);
      }
    };

    fetchSpotDetails();
  }, [spotId]);

  if (!spotDetails) {
    return <div>Loading...</div>;
  }

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

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = (start, end) => {
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, total: diff };
  };

  const calculatePrice = (duration) => {
    let  { hours, minutes, total } = duration;

    if (minutes > 0) {
      hours += 1;
    }

    const days = Math.ceil(total / (1000 * 60 * 60 * 24));
    const months = Math.ceil(days / 30);

    const pricePerHour = spotDetails.pricePerHour || Infinity;
    const pricePerDay = spotDetails.pricePerDay || Infinity;
    const pricePerMonth = spotDetails.pricePerMonth || Infinity;

    const hourlyPrice = hours * pricePerHour;
    const dailyPrice = days * pricePerDay;
    const monthlyPrice = months * pricePerMonth;

    if (monthlyPrice < dailyPrice && monthlyPrice < hourlyPrice) {
      return monthlyPrice;
    } else if (dailyPrice < hourlyPrice) {
      return dailyPrice;
    } else {
      return hourlyPrice;
    }
  };

  const duration = calculateDuration(dateTimeIn, dateTimeOut);
  const finalPrice = calculatePrice(duration);

  const handleReservation = async () => {
    try {
      const userEmail = await api.get(`/users/me`);
      const response = await api.post("/reservation/create", {
        userEmail: userEmail.data.data.email,
        parkingSpaceId: spotId,
        vehicleReg: vehicleReg,
        startTime: dateTimeIn.toISOString(),
        endTime: dateTimeOut.toISOString(),
        totalPrice: finalPrice,
      });
      console.log("Reservation successful:", response.data);
      // Redirect to the user's reservations page
      navigate("/");

    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-5">
      <h2 className="text-4xl font-bold mb-8 text-center text-slate-900">
        Confirm Your Reservation
      </h2>
      <div className="flex items-center justify-center w-full">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left Section */}
            <div className="w-full md:w-2/3 md:pr-4">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 border-b border-black text-center">Booking Details</h3>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Parking at{": "}</span>
                  {spotDetails.address.split(",").slice(0, 2).join(",")}
                </p>
                <div className="mt-4 text-lg text-gray-600">
                  <p className="mb-2">
                    <span className="font-semibold">Arriving on: </span>
                    <span className="text-blue-600">
                      {formatDate(dateTimeIn)}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Leaving on: </span>
                    <span className="text-blue-600">
                      {formatDate(dateTimeOut)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Duration: </span>
                    {`${duration.hours} hours ${duration.minutes} minutes`}
                  </p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Vehicle Information</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Your vehicle license plate number will be shared with the
                  parking space owner.
                </p>
                <input
                  type="text"
                  placeholder="Enter your vehicle registration number"
                  className="border border-gray-300 rounded w-full p-3 text-lg"
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                />
                <p className="mt-2 text-red-600">
                  Your Reservation Cannot be Cancelled.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Availability</h3>
                <div className="flex flex-wrap text-lg text-gray-600">
                  {spotDetails.daysAvailable.map((day, index) => (
                    <div key={index}>
                      {day.day}
                      {index < spotDetails.daysAvailable.length - 1 ? ", " : ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/3 md:pl-4 mt-8 md:mt-0">
              <div className="mb-8">
                <Carousel
                  responsive={responsive}
                  className="rounded-lg overflow-hidden shadow-lg"
                  arrows
                >
                  {spotDetails.spotImages &&
                  spotDetails.spotImages.length > 0 ? (
                    spotDetails.spotImages.map((imageLink, index) => (
                      <div key={index} className="p-2">
                        <img
                          src={imageLink}
                          alt={`Spot ${index}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </Carousel>
              </div>
              <div className="bg-gray-50 p-6 rounded shadow-lg">
                <p className="flex justify-between text-lg text-gray-700 mb-2">
                  <span>Parking fee</span>
                  <span>CA${finalPrice.toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-lg text-gray-700 mb-2">
                  <span>
                    Transaction fee <span className="text-gray-500">(i)</span>
                  </span>
                  <span>CA${(finalPrice * 0.05).toFixed(2)}</span>
                </p>
                <hr className="my-4" />
                <p className="flex justify-between text-xl font-semibold text-gray-800">
                  <span>Final price</span>
                  <span>CA${(finalPrice + finalPrice * 0.05).toFixed(2)}</span>
                </p>
              </div>
              <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg w-full text-xl font-semibold shadow-md hover:bg-blue-700 transition duration-300"
              onClick={handleReservation}>
                Reserve This Spot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReservation;
