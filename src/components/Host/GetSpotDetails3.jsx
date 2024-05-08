import React, {useState} from "react";
import NextButton from "./NextButton";

function GetSpotDetails3() {
  const [photos, setPhotos] = useState([]);
  
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newPhotos = [...photos];
      newPhotos[index] = reader.result;
      setPhotos(newPhotos);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="flex flex-col items-center justify-center h-full p-4 w-full">
        <div className="flex flex-col items-center justify-center">
          <label className="text-xl lg:text-2xl font-bold mb-5">
            Add Photos
          </label>
        </div>
        <div>
          {/* get images from the user in a grid*/}
          <div className="grid grid-cols-3 gap-4">
            {Array(6)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 h-40 w-40 flex items-center justify-center"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, index)}
                    style={{ display: "none" }}
                    id={`upload-button-${index}`}
                  />
                  <label
                    htmlFor={`upload-button-${index}`}
                    className="text-2xl cursor-pointer"
                  >
                    +
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
      <NextButton to="/become-a-host/availability-and-pricing" />
    </div>
  );
}

export default GetSpotDetails3;
