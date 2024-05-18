import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../conf/axiosConfig";
import { clearForm } from "../../store/formReducer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ReviewPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.form);
    // get the owner information from the local storage
    const owner = JSON.parse(localStorage.getItem("user"));
    console.log(owner.data.email)

    const handleSubmit = async () => {
        try {
            const payload = { ...formData, owner: owner.data.email};
            console.log("Payload:", payload)
            const response = await api.post("/parking-space/create", payload);
            console.log("Submission successful:", response);
            dispatch(clearForm());
            navigate("/");
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
        <div className="flex flex-col items-center py-10 px-4 lg:px-20 mt-10">
        <h2 className="text-4xl font-bold mb-8">Review Your Details</h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-3/4 grid grid-cols-1 lg:grid-cols-9 gap-4">
            <div className="col-span-6">
            <h3 className="text-2xl font-semibold mb-2">Title</h3>
            <p className="border p-2 rounded mb-4">{formData.title}</p>
            </div>
            <div className="col-span-3 row-span-2">
            <h3 className="text-2xl font-semibold mb-2">Photos</h3>
            <Carousel
                responsive={responsive}
                className="rounded-lg overflow-hidden"
            >
                {formData.spotImages.map((image, index) => (
                <div key={index} className="p-2">
                    <img
                    src={image.url}
                    alt={`Spot ${index}`}
                    className="w-full h-40 object-cover rounded-lg"
                    />
                </div>
                ))}
            </Carousel>
            </div>
            <div className="col-span-6">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="border p-2 rounded">{formData.description}</p>
            </div>
            <div className="col-span-3 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Information</h3>
            <p>
                <span className="font-semibold">Address:</span> {formData.address}
            </p>
            <p>
                <span className="font-semibold">Type of Spot:</span>{" "}
                {formData.typeOfSpot}
            </p>
            <p>
                <span className="font-semibold">Vehicle Size:</span>{" "}
                {formData.vehicleSize}
            </p>
            <p>
                <span className="font-semibold">Spaces to Rent:</span>{" "}
                {formData.spacesToRent}
            </p>
            </div>
            <div className="col-span-3 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <p>
                <span className="font-semibold">Per Hour:</span> $
                {formData.pricePerHour}
            </p>
            <p>
                <span className="font-semibold">Per Day:</span> $
                {formData.pricePerDay}
            </p>
            <p>
                <span className="font-semibold">Per Month:</span> $
                {formData.pricePerMonth}
            </p>
            </div>
            <div className="col-span-3 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Availability</h3>
            <p>
                <span className="font-semibold">Available From:</span>{" "}
                {new Date(formData.availableFrom).toLocaleDateString()}
            </p>
            <p>
                <span className="font-semibold">Days Available:</span>{" "}
                {formData.daysAvailable.join(", ")}
            </p>
            <p>
                <span className="font-semibold">Access Information</span>{" "}
                {formData.accessInstructions}
            </p>
            </div>
            <div className="col-span-9 flex justify-end mt-4">
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

export default ReviewPage;
