import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../conf/axiosConfig';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    const maxAttempts = 6;

    const poll = async () => {
      attempts++;
      try {
        const response = await api.get(`/pay/checkout-session/${sessionId}`);
        const { reservationId } = response.data;

        if (reservationId) {
          // Stripe webhook has processed — navigate to the reservation
          navigate(`/reservation/${reservationId}`);
          return;
        }
      } catch (e) {
        // session retrieval failed — keep polling up to maxAttempts
      }

      if (attempts < maxAttempts) {
        setTimeout(poll, 2000);
      } else {
        // Webhook took too long — ask user to contact support
        setTimedOut(true);
      }
    };

    // Wait 2s for the Stripe webhook to process before first poll
    const timer = setTimeout(poll, 2000);
    return () => clearTimeout(timer);
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

        {timedOut ? (
          <p className="text-gray-600 text-xl">
            Your reservation is being processed. If it doesn't appear shortly,{' '}
            <span
              className="text-primary-color cursor-pointer"
              onClick={() => navigate('/contact')}
            >
              contact our support team
            </span>{' '}
            with your session ID:{' '}
            <code className="text-sm bg-gray-100 px-1 rounded">{sessionId}</code>
          </p>
        ) : (
          <p className="text-gray-600 text-xl">
            Setting up your reservation…
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
