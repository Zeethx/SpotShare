import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import conf from "../../conf/conf";
import "./Map.css";

const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: '27vw',
  borderRadius: '2%'
};

const center = {
  lat: 43.7,
  lng: -79.42
};
const inputStyle = "absolute top-5 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md px-4 py-2 text-lg bg-white shadow-md rounded-full box-border";

function Map({ onAddressChange }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: conf.googleMapsApiKey,
    libraries
  });

  const onMapLoad = useCallback((map) => {
    // store the map object in state
    setMap(map);
  }, []);

  const onPlaceChanged = () => {
    if (!autocomplete) {
      console.log("Autocomplete is not loaded yet!");
      return;
    }
    const place = autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      const location = place.geometry.location;
      map.panTo(location);
      map.setZoom(15);
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      onAddressChange(place.formatted_address);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
        options={{ mapTypeControl: false, streetViewControl: false, fullscreenControl: false }}
      >
      <Autocomplete
        onLoad={(autocomplete) => setAutocomplete(autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
          <input type="text" placeholder="Enter your Address" className={inputStyle} />
        </Autocomplete>
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </>
  );
}

export default Map;
