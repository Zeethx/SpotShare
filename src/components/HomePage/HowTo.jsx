import React, { useState } from "react";
import { Card } from "../"; // Ensure the Card component is properly imported

const HowTo = () => {
  const [isHostView, setIsHostView] = useState(true); // State to track toggle position

  const content = {
    hosts: [
      {
        title: "List Your Spot",
        description: "Open SpotShare, tap 'List Your Spot', enter details about your unused space.",
        imageUrl: "images/list_your_spot.svg"
      },
      {
        title: "Set Availability",
        description: "Choose the dates and times your spot is available for sharing and add photos.",
        imageUrl: "images/set_availability.svg"
      },
      {
        title: "Earn Cash",
        description: "Drivers can book your spot - you'll receive notifications and payments through SpotShare!",
        imageUrl: "images/earn_cash.svg"
      }
    ],
    drivers: [
      {
        title: "Find a Spot",
        description: "Use the app to find available spots near your location.",
        imageUrl: "images/find_a_spot.svg"
      },
      {
        title: "Reserve your Spot",
        description: "Reserve the spot and pay directly through the app.",
        imageUrl: "images/reserve.svg"
      },
      {
        title: "Park Your Car",
        description: "Follow the directions and easily park your car in the reserved spot.",
        imageUrl: "https://source.unsplash.com/random/6"
      }
    ]
  };

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl text-indigo-600 font-semibold tracking-wide uppercase">How it works</h2>
          <div className="flex justify-center items-center mt-4">
            <span className="text-lg font-medium mr-2">For Hosts</span>
            <label htmlFor="toggle" className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" id="toggle" className="sr-only peer" checked={!isHostView} onChange={() => setIsHostView(!isHostView)} />
              <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 transition duration-300 ease-in-out after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all after:duration-300 peer-checked:after:translate-x-6 "></div>
            </label>
            <span className="text-lg font-medium ml-2">For Drivers</span>
          </div>
        </div>
        <div className="flex justify-around flex-wrap">
          {content[isHostView ? 'hosts' : 'drivers'].map((item, index) => (
            <Card key={index} title={item.title} description={item.description} imageUrl={item.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowTo;
