import React, { useState, useEffect } from 'react';
import api from '../../conf/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function ParkingHistory() {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/users/reservations')
      .then((response) => {
        // Filter by endTime and sort by endTime in descending order
        const filteredReservations = response.data.data
          .filter((reservation) => new Date(reservation.endTime) < Date.now())
          .sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
        setParkingHistory(filteredReservations);
        console.log('User reservations:', filteredReservations);
      })
      .catch((error) => {
        setError('Failed to fetch reservations');
        console.error('Error fetching user reservations:', error);
      });
  }, []);

  const handleDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const totalMinutes = Math.floor((end - start) / 1000 / 60);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    let duration = '';
    if (days > 0) {
      duration += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
      duration += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      duration += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return duration.trim();
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b-2 border-black">
        Recent Parkings
      </h2>
      {parkingHistory.length > 0 ? (
        <div>
          {parkingHistory.slice(0, 5).map((history, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <p className="text-gray-600">
                  <strong>Parking at:</strong>{' '}
                  {history.parkingSpace.address.split(',').slice(0, 2).join(',')}
                </p>
                <p className="text-gray-600">
                  <strong>Booked on:</strong>{' '}
                  {new Date(history.createdAt).toLocaleString().split(',')[0]}{' '}
                  for{' '}
                  <span className="font-semibold">
                    {handleDuration(history.startTime, history.endTime)}
                  </span>
                </p>
              </div>
              <div>
                <p className="capitalize">
                  {history.review ? (
                    <span className="text-gray-500">Reviewed</span>
                  ) : (
                    <button
                      className="hover:underline text-primary-color"
                      onClick={() =>
                        navigate(
                          `/write-a-review/${history.parkingSpace._id}/${history._id}`
                        )
                      }
                    >
                      Write a Review
                    </button>
                  )}
                </p>
                <p className="text-gray-600">
                  <strong>Spendings:</strong> ${history.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg h-64 overflow-y-auto">
          <p className="text-gray-600">No parking history available.</p>
        </div>
      )}
    </div>
  );
}
