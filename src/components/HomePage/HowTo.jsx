import React, { useState } from "react";
import { Card } from "../"; // Ensure your Card import path is correct

const images = [
  
  [
    <Card
      title={"Find Your Spot"}
      description={`Open SpotShare, enter your destination,
      and browse available parking near you.`}
      imageUrl={"https://source.unsplash.com/random/4"}
    />,
    <Card
      title={"Reserve"}
      description={`Choose your perfect spot, book it with 
        a few clicks, and pay conveniently 
        through the app.`}
      imageUrl={"https://source.unsplash.com/random/5"}
    />,
    <Card
      title={"Park & Relax "}
      description={`Follow directions to your reserved spot 
      and enjoy stress-free parking!`}
      imageUrl={"https://source.unsplash.com/random/6"}
    />,
  ],
  [
    <Card
      title={"List Your Spot"}
      description={` Open SpotShare, tap "List Your Spot," 
      enter details about your unused space.`}
      imageUrl={"https://source.unsplash.com/random/1"}
    />,
    <Card
      title={"Set Availability"}
      description={` Choose the dates and times your spot 
      is available for sharing and add photos.`}
      imageUrl={"https://source.unsplash.com/random/2"}
    />,
    <Card
      title={"Earn Cash"}
      description={`Drivers can book your spot - you'll 
      receive notifications and payments 
      through SpotShare!`}
      imageUrl={"https://source.unsplash.com/random/3"}
    />,
  ]
];

const HowTo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="lg:h-screen">
      <h2 className="text-4xl font-bold text-primary-color text-center py-5">
        {" "}
        How it works{" "}
      </h2>

      <div className="flex justify-center items-center w-full ">
        <div className="relative w-full">
          <div className="flex justify-center items-center overflow-hidden">
            <div className="flex transition-all duration-300 flex-col lg:flex-row ease-in-out transform scale-100">
              {images[activeIndex].map((card, index) => (
                <div key={index} className=" w-full  lg:w-1/3 px-4">
                  {card}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 justify-center items-center p-4 h-full cursor-pointer focus:outline-none"
            onClick={goToPrevSlide}
          >
            <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/70 hover:bg-white/100 focus:ring-4 focus:ring-white">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 justify-center items-center p-4 h-full cursor-pointer focus:outline-none"
            onClick={goToNextSlide}
          >
            <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/70 hover:bg-white/100 focus:ring-4 focus:ring-white">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
