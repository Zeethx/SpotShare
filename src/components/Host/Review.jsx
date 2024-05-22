import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../conf/axiosConfig";
import { clearForm } from "../../store/formReducer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { auth } from "../../firebase/firebase";

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);

  //use firebase auth to get the owner email
  const owner = auth.currentUser.email;
  console.log("Owner:", owner);

  useEffect(() => {
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, owner: owner };
      console.log("Payload:", payload);
      const response = await api.post("/parking-space/create", payload);
      console.log("Submission successful:", response);
      dispatch(clearForm());
      navigate("/submission-confirmation");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 lg:px-20">
      <h2 className="text-4xl font-bold mb-8 text-center">Review Your Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-3/4 grid grid-cols-1 lg:grid-cols-9 gap-4">
        <div className="col-span-1 lg:col-span-6">
          <h3 className="text-2xl font-semibold mb-2">Title</h3>
          <p className="border p-2 rounded mb-4">{formData.title}</p>
        </div>
        <div className="col-span-1 lg:col-span-3 row-span-2">
          <h3 className="text-2xl font-semibold mb-2">Photos</h3>
          <div>
            <Carousel responsive={responsive} className="rounded-lg overflow-hidden">
              {formData.spotImages.map((image, index) => (
                <div key={index} className="p-2">
                  <img
                    src={image.url}
                    alt={`Spot ${index}`}
                    className="h-40 w-full object-contain rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-6">
          <h3 className="text-2xl font-semibold mb-2">Description</h3>
          <p className="border p-2 rounded">{formData.description}</p>
        </div>
        <div className="col-span-1 lg:col-span-3 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Information</h3>
          <p>
            <span className="font-semibold">Address:</span> {formData.address}
          </p>
          <p>
            <span className="font-semibold">Type of Spot:</span> {formData.spotType}
          </p>
          <p>
            <span className="font-semibold">Vehicle Size:</span> {formData.vehicleSize}
          </p>
          <p>
            <span className="font-semibold">Spaces to Rent:</span> {formData.spacesToRent}
          </p>
        </div>
        <div className="col-span-1 lg:col-span-3 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Pricing</h3>
          <p>
            <span className="font-semibold">Per Hour:</span> ${formData.pricePerHour}
          </p>
          <p>
            <span className="font-semibold">Per Day:</span> ${formData.pricePerDay}
          </p>
          <p>
            <span className="font-semibold">Per Month:</span> ${formData.pricePerMonth}
          </p>
        </div>
        <div className="col-span-1 lg:col-span-3 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Availability</h3>
          <p>
            <span className="font-semibold">Available From:</span>{" "}
            {new Date(formData.availableTill).toLocaleDateString()}
          </p>
          <p className=" max-w-full overflow-auto">
            <span className="font-semibold">Days Available:</span>{" "}
            {formData.daysAvailable.join(", ")}
          </p>
          <p className=" max-w-full break-words">
            <span className="font-semibold">Access Information:</span>{" "}
            {formData.accessInstructions}
          </p>
        </div>
        <div className="col-span-1 lg:col-span-9 flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600"
          >
            Confirm Submission
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
