import React from "react";
import "ldrs/pinwheel";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen" >
      <l-pinwheel size="100" stroke="3.5" speed="0.9" color="black"></l-pinwheel>
    </div>
  );
}

export default Loader;
