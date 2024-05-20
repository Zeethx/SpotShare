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
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "./Marker.css";

const libraries = ["places"];

function FindASpot() {
  const location = useLocation();
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [address, setAddress] = useState(location.state?.address || "");
  const [dateTimeIn, setDateTimeIn] = useState(location.state?.dateTimeIn ? new Date(location.state.dateTimeIn) : new Date());
  const [dateTimeOut, setDateTimeOut] = useState(location.state?.dateTimeOut ? new Date(location.state.dateTimeOut) : new Date(new Date().getTime() + 3600000));

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      location: address,
      dateTimeIn: dateTimeIn,
      dateTimeOut: dateTimeOut,
    },
  });

  const inputStyle =
    "w-full px-4 py-2  text-lg bg-white shadow-md rounded-md box-border focus:ring-2 focus:ring-primary-color transition-all duration-300";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: conf.googleMapsApiKey,
    libraries,
  });

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
            map.setZoom(15);
            setMarkerPosition({ lat, lng });
          } else {
            console.error("Invalid geocoded coordinates:", { lat, lng });
          }
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }, [address, map]);

  useEffect(() => {
    if (markerPosition && map) {
      map.panTo(markerPosition);
      map.setZoom(15);
    }
  }, [markerPosition, map]);

  const onSubmit = async (data) => {
    if (markerPosition && !isNaN(markerPosition.lat) && !isNaN(markerPosition.lng)) {
      try {
        const response = await api.get(`/parking-space/nearby`, {
          params: {
            location: `${markerPosition.lat},${markerPosition.lng}`,
            timeIn: data.dateTimeIn.toISOString(),
            timeOut: data.dateTimeOut.toISOString(),
          },
        });
        setParkingSpots(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("Invalid marker position:", markerPosition);
    }
  };

  if (loadError) {
    return <div className="text-center text-red-500 mt-4">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-28 pb-12" >
      <div className="flex flex-col p-6 w-full lg:w-1/3 shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Find a Spot</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Autocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={onPlaceChanged}>
                  <input type="text" placeholder="Enter the Address" {...field} className={inputStyle} />
                </Autocomplete>
              )}
            />
          </div>
          <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">From</label>
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
          <label className="block text-sm font-medium text-gray-700">Until</label>
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
                  minDate={getValues("dateTimeIn")}
                  className={inputStyle}
                />
              )}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={!markerPosition}
            >
              Search For Spots Here
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <div className="h-full">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "2%"}}
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
            {parkingSpots.map((spot, index) => (
              <CustomMarker
                key={index}
                position={{ lat: spot.coordinates[1], lng: spot.coordinates[0] }}
                label={`$${spot.pricePerMonth}`}
                spotId={spot._id}
                dateTimeIn={getValues("dateTimeIn")}
                dateTimeOut={getValues("dateTimeOut")}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default FindASpot;
