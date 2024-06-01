import React, {useEffect} from 'react';
import api from '../../conf/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';


function PaymentSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const reservationId = query.get('reservationId');

    useEffect(() => {
        api.post(`/pay/${reservationId}/confirm-payment`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, [reservationId]);


  return (
    <div className="flex pt-[4vw] justify-center ">
    <div className=" p-8 rounded text-center">
        <img src="images/payment_success.svg" alt="Payment Successful" className="w-40 h-40 mx-auto mb-6" />
      <h1 className="text-7xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 text-xl mb-6">
      Thank you for parking with SpotShare. An automated payment receipt will be sent
          to your registered email.
      </p>
      <p className="text-gray-600 text-xl">
        If you have any questions, feel free to <span className="text-primary-color cursor-pointer" onClick={() => navigate('/contact')}>contact our support team</span>.
      </p>
      <button className="bg-primary-color text-white px-4 py-2 rounded-xl mt-6" onClick={() => navigate(`/reservation/${reservationId}`)}>View Reservation</button>
    </div>
  </div>
  );
}

export default PaymentSuccess;
