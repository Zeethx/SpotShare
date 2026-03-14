import React from "react";
import { ParkingForm } from "../";

function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row lg:h-screen justify-center items-center pb-20 gap-5">
      <div className="lg:w-1/2">
        <span className="text-center">
          <h2 className="text-6xl xl:text-7xl font-black font-freeman">
            Stop Searching, Start <span className='text-primary-color'>SpotSharing!</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mt-3">
            The convenient way to find and share your perfect parking spot.
          </p>
        </span>
        <ParkingForm />
      </div>
      <div className="lg:w-1/2">
        <picture>
          <source srcSet="images/hero_image.webp" type="image/webp" />
          <img src="images/hero_image.png" alt="Parking"
            className="rounded-lg"
            width={1200} height={900}
            fetchpriority="high" />
        </picture>
      </div>
    </div>
  );
}

export default HeroSection;
