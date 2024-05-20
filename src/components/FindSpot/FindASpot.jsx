import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import conf from "../../conf/conf";
import "../Map/Map.css";
import api from "../../conf/axiosConfig";
import CustomMarker from "./CustomMarker";
import "./Marker.css";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

const libraries = ["places"];

function Map({ address, onAddressChange }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);

  // Set the default time to the current time and 3 hours later
  const now = new Date();
  const threeHoursLater = new Date(now.getTime());
  threeHoursLater.setHours(now.getHours() + 3);

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      location: address,
      dateTimeIn: now,
      dateTimeOut: threeHoursLater,
    },
  });

  const inputStyle =
    "absolute top-5 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md px-4 py-2 text-lg bg-white shadow-md rounded-full box-border";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: conf.googleMapsApiKey,
    libraries,
  });

  const fetchParkingSpots = async (lat, lng, timeIn, timeOut) => {
    try {
      const response = await api.get(`/parking-space/nearby`, {
        params: {
          location: `${lat},${lng}`,
          timeIn: timeIn.toISOString(),
          timeOut: timeOut.toISOString(),
        },
      });
      setParkingSpots(response.data);
      console.log("Parking spots fetched:", response.data);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
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
          onAddressChange(address);
          setValue("location", address); // Update the form value for location
          if (map) {
            map.panTo({ lat, lng });
            map.setZoom(15);
          }
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
          const { lat, lng } = results[0].geometry.location;
          if (!isNaN(lat) && !isNaN(lng)) {
            map.setCenter({ lat, lng });
            map.setZoom(15);
            setMarkerPosition({ lat, lng });
            console.log("Address geocoded:", address, { lat, lng });
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
      map.setZoom(15);
      console.log("Map panned to:", markerPosition);
    }
  }, [markerPosition, map]);

  const onSubmit = async (data) => {
    const { dateTimeIn, dateTimeOut } = data;
    if (markerPosition && !isNaN(markerPosition.lat) && !isNaN(markerPosition.lng)) {
      const { lat, lng } = markerPosition;
      try {
        await fetchParkingSpots(lat, lng, dateTimeIn, dateTimeOut);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("Invalid marker position:", markerPosition);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="mb-4 lg:mb-4">
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
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="mt-1 w-full p-2 justify-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                />
              )}
            />
          </div>
          <div>
            <h1 className="text-4xl font-semibold">Find a Spot</h1>
          </div>
          <div>
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
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                />
              )}
            />
          </div>
        </div>
        <div className="map-container" style={{ width: "100%", height: "500px" }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={markerPosition || { lat: 43.7, lng: -79.42 }}
            zoom={12}
            onLoad={onMapLoad}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
          <Autocomplete
            onLoad={(autocomplete) => setAutocomplete(autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter the Address"
              className={inputStyle}
            />
          </Autocomplete>
          {markerPosition && <Marker position={markerPosition} />}
          {parkingSpots.map((spot, index) => (
            <CustomMarker
              key={index}
              position={{ lat: spot.coordinates[1], lng: spot.coordinates[0] }}
              label={`$${spot.pricePerMonth}`}
              spotId={spot._id} // Ensure spotId is passed here
            />
          ))}
        </GoogleMap>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-center disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={!markerPosition}>
            Search For Spots Here
          </button>
        </div>
      </form>
    </div>
  );
}

function FindASpot() {
  const [address, setAddress] = useState("");

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <div className="pt-[10vw] ">
      <Map address={address} onAddressChange={setAddress} />
    </div>
  );
}

export default FindASpot;
