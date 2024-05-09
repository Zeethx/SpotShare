import React, { useState } from "react";
import GetSpotDetails1 from "./GetSpotDetails1";
import GetSpotDetails2 from "./GetSpotDetails2";
import GetSpotDetails3 from "./GetSpotDetails3";
import FormFooter from "../Footer/FormFooter";

function GetSpotDetails() {
  const [step, setStep] = useState(1);

  return (
    <div className="h-screen lg:pt-[7vw] pt-[20vw]">

      <div className="flex flex-col items-center justify-center">
        <div className="w-full lg:w-1/2 pr-2">
          <div className="flex flex-col items-center justify-center mb-1">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary-black p-2">
              Spot Details
            </h2>
            <p className="text-lg lg:text-xl text-gray-700">
              Provide essential details to help renters find and choose your
              spot.
            </p>
          </div>
        </div>
        { step === 1 && <GetSpotDetails1 setStep={setStep}/>}
        { step === 2 && <GetSpotDetails2 setStep={setStep}/>}
        { step === 3 && <GetSpotDetails3 setStep={setStep}/>}
      </div>
    </div>
  );
}

export default GetSpotDetails;
