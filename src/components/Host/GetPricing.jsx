import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateForm } from "../../store/formReducer";
import { FormFooter } from "..";

function SetPricing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const [hourlyPrice, setHourlyPrice] = useState(formData.pricePerHour || 5);
  const [dailyPrice, setDailyPrice] = useState(formData.pricePerDay || 20);
  const [monthlyPrice, setMonthlyPrice] = useState(formData.pricePerMonth || 150);

  const handlePriceChange = (setter) => (e) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  const handleSubmit = () => {
    dispatch(updateForm({ name: 'pricePerHour', value: hourlyPrice }));
    dispatch(updateForm({ name: 'pricePerDay', value: dailyPrice }));
    dispatch(updateForm({ name: 'pricePerMonth', value: monthlyPrice }));
    navigate("/become-a-host/review");
  };

  return (
    <div className="lg:pt-[7vw] pb-[10vw] h:screen py-20">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary-black p-2 text-center">
          Set Pricing
        </h2>
        <p className="text-center pb-20 lg:text-xl text-wrap">
          Set hourly, daily, or monthly rates to suit various needs. For unavailable options, simply set the price to $0 to exclude them.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        {[
          { label: "Hourly", price: hourlyPrice, setter: setHourlyPrice },
          { label: "Daily", price: dailyPrice, setter: setDailyPrice },
          { label: "Monthly", price: monthlyPrice, setter: setMonthlyPrice },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <h2 className="text-2xl lg:text-5xl text-primary-black p-2 pb-6">
              {item.label}
            </h2>
            <div className="flex items-center justify-center text-6xl lg:text-[8vw]">
              <span className="text-4xl lg:text-[6vw]">$</span>
              <input
                type="text"
                value={item.price}
                onChange={handlePriceChange(item.setter)}
                className="w-1/3 md:w-1/5 lg:w-1/2 appearance-none border-none bg-transparent outline-none"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  appearance: "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <FormFooter
        text="Set Availability and Pricing: Step 2"
        to="/become-a-host/review"
        onNextClick={handleSubmit}
      />
    </div>
  );
}

export default SetPricing;
