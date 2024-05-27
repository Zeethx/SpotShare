// src/pages/ReservationsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../conf/axiosConfig";
import { Container, Loader } from "../components";

const ReservationsPage = () => {
  const { id } = useParams(); // id of the parking spot
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/reservation/all?parkingSpaceId=${id}`);
        setReservations(response.data.data);
        setLoading(false);
      } catch (err) {
        if (err.response.status === 403) {
            navigate('/404');
        }
        setError("Failed to fetch reservations");
        setLoading(false);
      }
    };
    fetchReservations();
  }, [id, navigate]);

  const currentReservations = reservations.filter(
    (reservation) =>
      new Date(reservation.startTime) <= new Date() &&
      new Date(reservation.endTime) >= new Date()
  );
  const pastReservations = reservations.filter(
    (reservation) => new Date(reservation.endTime) < new Date()
  );
  const upcomingReservations = reservations.filter(
    (reservation) => new Date(reservation.startTime) > new Date()
  );

  const getFilteredReservations = () => {
    switch (filter) {
      case "current":
        return currentReservations;
      case "upcoming":
        return upcomingReservations;
      case "past":
        return pastReservations;
      case "all":
      default:
        return reservations;
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Container>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center font-freeman">Reservations</h1>
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={`w-24 h-10 p-2 rounded ${
                filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              } flex-1`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("current")}
              className={`w-24 h-10 p-2 rounded ${
                filter === "current" ? "bg-blue-500 text-white" : "bg-gray-200"
              } flex-1`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`w-24 h-10 p-2 rounded ${
                filter === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"
              } flex-1`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`w-24 h-10 p-2 rounded ${
                filter === "past" ? "bg-blue-500 text-white" : "bg-gray-200"
              } flex-1`}
            >
              Past
            </button>
          </div>
          {getFilteredReservations().length === 0 ? (
            <div className="mt-12">
              <img src="/images/nothing_there.svg" alt="No reservations" className="mx-auto w-52" />
              <p className="text-center text-gray-600 mt-2">&nbsp;There's nothing here.</p>
            </div>
          ) : (
            getFilteredReservations().map((reservation, index) => (
              <div
                key={index}
                className="border-b py-4 flex flex-col sm:flex-row gap-4 items-center"
              >
                <img
                  src={reservation.user.profilePhoto}
                  alt="profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">
                    <strong>Name:</strong> {reservation.user.fullName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Start Time:</strong>{" "}
                    {new Date(reservation.startTime).toLocaleDateString(
                      undefined,
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </p>
                  <p className="text-gray-600">
                    <strong>End Time:</strong>{" "}
                    {new Date(reservation.endTime).toLocaleDateString(
                      undefined,
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </p>
                  <p className="text-gray-600">
                    <strong>License Plate:</strong> {reservation.vehicleReg}
                  </p>
                  <p className="text-green-700 font-bold">
                    <strong>Total Revenue:</strong> ${reservation.totalPrice}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Back
        </button>
      </div>
    </Container>
  );
};

export default ReservationsPage;
