import React from "react";
import { HorizontalCard, Button } from "../";
import { useNavigate } from "react-router-dom";


function GetStarted() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/become-a-host/location");
  }
  return (
    <div className="3xl:min-h-screen flex flex-col lg:flex-row items-center justify-center gap-4">
      <div className="lg:w-1/2 text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-primary-color font-freeman">
          Turn Your <span className="text-[#32deaa]" >Empty</span> Space <br />into <span className="text-[#32deaa]" > Earning</span> Space
        </h1>
        <div className="mt-6">
        <Button text="Get Started" className="w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 shadow-md shadow-slate-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
        onClick={handleSubmit}/>
      </div></div>
      <div className="lg:w-1/2">
        <div className="flex flex-col items-center">
          <HorizontalCard
          title = "1. List Your Spot"
            description="Provide essential details and high-quality 
            photos of your parking space to attract renters."
            imageUrl="images/list_spot_hosts.svg"
          />
            <div className="border border-x-0">
          <HorizontalCard
          title = "2. Set Availability and Pricing"
            description="Use our scheduling tools to determine 
            availability and set competitive rates based 
            on your preferences."
            imageUrl="images/availability_pricing.svg"
          /></div>
          <HorizontalCard
          title = "3. Publish and Earn"
            description="Publish your listing to start earning and promote 
            it on social media directly through our app for
            increased exposure."
            imageUrl="images/publish_spot.svg"
          />
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
