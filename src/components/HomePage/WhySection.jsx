import { HorizontalCard } from "../";
import React from "react";

function WhySection() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col  lg:flex-row my-16">
        <div className="flex w-full lg:w-1/2 text-primary-black items-center justify-center">
          <img
            className="rounded-t-lg "
            src="images/ec.svg"
            alt=""
          />
        </div>
        <div className="p-5 flex flex-col flex-wrap">
          <h2 className="text-4xl font-bold font-freeman text-primary-black text-center">
            Why SpotSharing?
          </h2>
          <HorizontalCard
            description="SpotShare ensures you're never far from a safe and convenient parking spot. 
            Our extensive network guarantees a parking space close to your destination, enabling hassle-free access wherever your travels take you"
            imageUrl="images/spots.svg"
          />
          <HorizontalCard
            description="SpotShare’s app is crafted to provide a seamless user experience. 
            Find and reserve a parking spot in just a few taps, or list your available space with equal ease, making parking stress-free and straightforward"
            imageUrl="images/userInterface.svg"
          />
          <HorizontalCard
            description="Enjoy the freedom of accessing and listing parking spaces with no membership fees, booking charges, or hidden costs. 
            SpotShare offers a truly cost-effective solution for both car owners and space holders."
            imageUrl="images/noHiddenCosts.svg"
          />
        </div>
      </div>
    </div>
  );
}

export default WhySection;
