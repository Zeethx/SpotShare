import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import conf from "../../conf/conf";
import api from "../../conf/axiosConfig";
import CustomMarker from "./CustomMarker";
import { Controller, useForm, useWatch } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast
import "./Marker.css";
import ClosestSpotsSidebar from "./ClosestSpotsSidebar";

const libraries = ["places"];

function FindASpot() {
  const location = useLocation();
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [closestSpots, setClosestSpots] = useState([]);
  const [address, setAddress] = useState(location.state?.address || "");
  const [price, setPrice] = useState("day");

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      location: address,
      dateTimeIn: location.state?.dateTimeIn ? new Date(location.state.dateTimeIn) : new Date(),
      dateTimeOut: location.state?.dateTimeOut ? new Date(location.state.dateTimeOut) : new Date(new Date().getTime() + 7200000),
    },
  });

  const watchedDateTimeIn = useWatch({ control, name: "dateTimeIn" });
  const watchedDateTimeOut = useWatch({ control, name: "dateTimeOut" });

  const inputStyle =
    "w-full px-4 py-2 text-lg bg-white shadow-md rounded-md box-border focus:ring-2 focus:ring-primary-color transition-all duration-300";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: conf.googleMapsApiKey,
    libraries,
  });

  const onBackClick = () => {
    setClosestSpots([]);
    setMarkerPosition(null);
    setAddress("");
  };

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;

        if (!isNaN(lat) && !isNaN(lng)) {
          setMarkerPosition({ lat, lng });
          setAddress(address);
          setValue("location", address); // Update the form value for location
        } else {
          console.error("Invalid coordinates:", { lat, lng });
        }
      }
    }
  };

  useEffect(() => {
    if (address && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0].geometry) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          if (!isNaN(lat) && !isNaN(lng)) {
            map.setCenter({ lat, lng });
            map.setZoom(13);
            setMarkerPosition({ lat, lng });
          } else {
            console.error("Invalid geocoded coordinates:", { lat, lng });
          }
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }
  }, [address, map]);

  useEffect(() => {
    if (markerPosition && map) {
      map.panTo(markerPosition);
      map.setZoom(13);
    }
  }, [markerPosition, map]);

  useEffect(() => {
    if (watchedDateTimeOut <= watchedDateTimeIn) {
      setValue("dateTimeOut", new Date(watchedDateTimeIn.getTime() + 3600000)); // Add 1 hour
    }
  }, [watchedDateTimeIn, watchedDateTimeOut, setValue]);

  const onSubmit = async (data) => {
    if (
      markerPosition &&
      !isNaN(markerPosition.lat) &&
      !isNaN(markerPosition.lng)
    ) {
      try {
        const response = await api.get(`/parking-space/nearby`, {
          params: {
            location: `${markerPosition.lat},${markerPosition.lng}`,
            timeIn: data.dateTimeIn.toISOString(),
            timeOut: data.dateTimeOut.toISOString(),
          },
        });

        if (response.data.length === 0) {
          // Trigger custom toast when no parking spots are found
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-gray-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 xl:mt-20`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">No Spots Available</p>
                    <p className="mt-1 text-sm text-gray-500">
                      No parking spaces were found in this area. Try again later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ));
        } else {
          const sortedSpots = response.data.sort((a, b) => {
            const distanceA = Math.sqrt(
              Math.pow(markerPosition.lat - a.coordinates[1], 2) +
                Math.pow(markerPosition.lng - a.coordinates[0], 2)
            );
            const distanceB = Math.sqrt(
              Math.pow(markerPosition.lat - b.coordinates[1], 2) +
                Math.pow(markerPosition.lng - b.coordinates[0], 2)
            );
            return distanceA - distanceB;
          });

          setParkingSpots(response.data);
          setClosestSpots(sortedSpots.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch parking spots");
      }
    } else {
      console.error("Invalid marker position:", markerPosition);
      toast.error("Please select a valid location");
    }
  };

  if (loadError) {
    return <div className="text-center text-red-500 mt-4">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:max-h-screen pb-12 pt-10">
      {closestSpots.length === 0 ? (
        <div className="flex flex-col p-6 w-full lg:w-1/3 shadow-lg rounded-xl lg:h-[80vh]">
          <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center font-freeman">
            Find a Spot
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter Options
              </label>
              <ul className="grid w-full gap-6 md:grid-cols-3">
                <li>
                  <input
                    type="radio"
                    id="hourly"
                    name="price"
                    className="hidden peer"
                    onChange={() => setPrice("hour")}
                  />
                  <label
                    htmlFor="hourly"
                    className="inline-flex items-center justify-between w-full p-2 text-slate-900 bg-white border-1 border-gray-200 rounded-lg shadow-lg cursor-pointer peer-checked:bg-primary-color peer-checked:border peer-checked:text-primary-white hover:bg-gray-100 "
                  >
                    <div className="block">
                      <div className="w-full text-lg">Hourly</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="daily"
                    name="price"
                    className="hidden peer"
                    checked={price === "day"}
                    onChange={() => setPrice("day")}
                  />
                  <label
                    htmlFor="daily"
                    className="inline-flex items-center justify-between w-full p-2 text-slate-900 bg-white border-1 border-gray-200 rounded-lg shadow-lg cursor-pointer peer-checked:bg-primary-color peer-checked:border peer-checked:text-primary-white hover:bg-gray-100 "
                  >
                    <div className="block">
                      <div className="w-full text-lg">Daily</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="monthly"
                    name="price"
                    className="hidden peer"
                    onChange={() => setPrice("month")}
                  />
                  <label
                    htmlFor="monthly"
                    className="inline-flex items-center justify-between w-full p-2 text-slate-900 bg-white border-1 border-gray-200 rounded-lg shadow-lg cursor-pointer peer-checked:bg-primary-color peer-checked:border peer-checked:text-primary-white hover:bg-gray-100 "
                  >
                    <div className="block">
                      <div className="w-full text-lg">Monthly</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Enter the Address"
                      {...field}
                      className={inputStyle}
                    />
                  </Autocomplete>
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                From
              </label>
              <Controller
                control={control}
                name="dateTimeIn"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, h:mm aa"
                    minDate={new Date()}
                    className={inputStyle}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <label className="block text-sm font-medium text-gray-700">
                Until
              </label>
              <Controller
                control={control}
                name="dateTimeOut"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, h:mm aa"
                    minDate={watchedDateTimeIn}
                    className={inputStyle}
                  />
                )}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-primary-color text-white rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={!markerPosition}
              >
                Search For Spots Here
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ClosestSpotsSidebar
          closestSpots={closestSpots}
          lat={markerPosition.lat}
          lng={markerPosition.lng}
          price={price}
          dateTimeIn={getValues("dateTimeIn")}
          dateTimeOut={getValues("dateTimeOut")}
          onBackClick={onBackClick}
        />
      )}
      <div className="flex-1">
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "2%",
            }}
            center={markerPosition || { lat: 43.7, lng: -79.42 }}
            zoom={12}
            onLoad={onMapLoad}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {markerPosition && <Marker position={markerPosition} />}
            {/* Display custom markers for parking spots */}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default FindASpot;
