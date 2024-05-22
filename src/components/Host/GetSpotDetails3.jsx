import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../store/formReducer';
import { FormFooter } from "../";
import api from "../../conf/axiosConfig";

function GetSpotDetails3() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.form.spotImages);

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("spotImages", file);

    try {
      const response = await api.post("/parking-space/upload", formData);
      const uploadedUrl = response.data.data[0]; // Ensure to get the correct URL from response
      dispatch(addImage({ index, url: uploadedUrl }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="flex flex-col items-center justify-center p-4 w-full">
        <div className="flex flex-col items-center justify-center mt-4">
          <label className="text-xl lg:text-2xl font-bold mb-5">Add Photos</label>
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative">
                {photos[index] ? (
                  <img
                    src={photos[index].url}
                    alt="spot"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full min-w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg p-4 hover:bg-gray-400">
                    <label
                      htmlFor={`upload-button-${index}`}
                      className="text-xl lg:text-2xl font-bold text-gray-700 cursor-pointer"
                    >
                      +
                    </label>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="flex absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  id={`upload-button-${index}`}
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <FormFooter
        text="Start Sharing Your Space: Step 3"
        to="/become-a-host/availability"
        disabledCondition={photos.length === 0}
      />
    </div>
  );
}

export default GetSpotDetails3;
