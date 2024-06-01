import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../conf/axiosConfig";
import { Container, Loader } from "../components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/reservation/${id}`);
        setReservation(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      } catch (err) {
        setError("Failed to fetch reservation details");
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  if (loading || !reservation)
    return (
      <Container>
        <Loader />
      </Container>
    );

  const { parkingSpace, totalPrice } = reservation;
  const images =
    parkingSpace.spotImages && parkingSpace.spotImages.length > 0
      ? parkingSpace.spotImages
      : [];

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

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center font-freeman">
        Reservation Details
      </h1>

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center pb-5">
          <h2 className="text-2xl font-semibold mb-4">{parkingSpace.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600 mb-4">{parkingSpace.address}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                parkingSpace.address
              )}`}
              className="text-blue-500 underline flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="flex flex-col items-center">
            {images.length > 0 ? (
              <Carousel
                responsive={responsive}
                className="rounded-lg overflow-hidden w-full"
              >
                {images.map((image, index) => (
                  <div key={index} className="p-2">
                    <img
                      src={image}
                      alt={`Spot ${index}`}
                      className="h-64 w-full object-contain rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <img
                src="default-image.jpg"
                alt="Default parking spot"
                className="h-64 w-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-600 mb-2">
              <strong>Start Time:</strong>{" "}
              {new Date(reservation.startTime).toLocaleString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>End Time:</strong>{" "}
              {new Date(reservation.endTime).toLocaleString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {parkingSpace.spotType}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Size:</strong> {parkingSpace.vehicleSize}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Total Price:</strong> ${totalPrice}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-600 mb-2">
              <strong>Parking Space Description:</strong>{" "}
              {parkingSpace.description}
            </p>
            {parkingSpace.accessInstructions ? (
              <p className="text-gray-600">
                <strong>Access Instructions:</strong>{" "}
                {parkingSpace.accessInstructions}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReservationDetails;
