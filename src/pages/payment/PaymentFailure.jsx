import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);
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
