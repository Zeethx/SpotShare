import React from "react";
import { ParkingForm } from "../";

function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row lg:h-screen items-center ">
      <div className="lg:w-1/2">
        <span className="text-center">
          <h2 className="text-primary-color text-4xl font-bold">
            Stop Searching, Start SpotSharing!
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            The convenient way to find and share your perfect parking spot.
          </p>
        </span>
        <ParkingForm />
      </div>
      <div className="lg:w-1/2">
        <img src="images/hero_image.png" alt="Parking" 
        className="rounded-lg"/>
      </div>
    </div>
  );
}

export default HeroSection;
