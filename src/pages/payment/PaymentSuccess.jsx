import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../conf/axiosConfig';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    const createReservation = async () => {
      try {
        const response = await api.get(`/pay/checkout-session/${sessionId}`);
        const session = response.data.data;
        console.log('Session:', session);

        if (session.payment_status === 'paid') {
          const reservationResponse = await api.post('/reservation/create', {
            parkingSpaceId: session.metadata.spotId,
            vehicleReg: session.metadata.vehicleReg,
            startTime: session.metadata.startTime,
            endTime: session.metadata.endTime,
            totalPrice: session.metadata.totalPrice,
          });

          if (reservationResponse.data && reservationResponse.data.data) {
            navigate(`/reservation/${reservationResponse.data.data._id}`);
          } else {
            console.error('Error creating reservation:', reservationResponse.data);
          }
        } else {
          console.error('Payment not completed.');
        }
      } catch (error) {
        console.error('Error creating reservation after payment:', error);
      }
    };

    if (sessionId) {
      createReservation();
    }
  }, [sessionId, navigate]);

  return (
    <div className="flex pt-[4vw] justify-center">
      <div className="p-8 rounded text-center">
        <img src="/images/payment_success.svg" alt="Payment Successful" className="w-40 h-40 mx-auto mb-6" />
        <h1 className="text-7xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 text-xl mb-6">
          Thank you for parking with SpotShare. An automated payment receipt will be sent
          to your registered email.
        </p>
        <p className="text-gray-600 text-xl">
          If you have any questions, feel free to <span className="text-primary-color cursor-pointer" onClick={() => navigate('/contact')}>contact our support team</span>.
        </p>
        <button className="bg-primary-color text-white px-4 py-2 rounded-xl mt-6" onClick={() => navigate(`/reservation/${sessionId}`)}>View Reservation</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
