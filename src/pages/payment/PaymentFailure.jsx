import React, { useEffect } from "react";
import api from "../../conf/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";

function PaymentFailure() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const reservationId = query.get("reservationId");

  useEffect(() => {
    api
      .post(`/pay/${reservationId}/cancel-payment`)
      .then((res) => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reservationId, navigate]);
  return (
    <div className="flex pt-[4vw] justify-center ">
    <div className=" p-8 rounded text-center">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">Payment Failed.</h1>
      <p className="text-gray-700 text-xl mb-6">
        Redirecting to the homepage...
      </p>
    </div>
  </div>
  );
}

export default PaymentFailure;
