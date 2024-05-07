import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import "./Map.css" 

const containerStyle = {
  width: "100%",
  height: '27vw',
  borderRadius: '6%'

};

const center = {
  lat: 43.7,
  lng: -79.42,
};
const inputStyle = "absolute top-5 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md px-4 py-2 text-lg bg-white shadow-md rounded-full box-border";
function Map() {
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onPlaceChanged = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        map.setCenter(
          new window.google.maps.LatLng(location.lat(), location.lng())
        );
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScriptNext
      googleMapsApiKey=""
      libraries={["places"]}
    >
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
        options={{ mapTypeControl: false, streetViewControl: false, fullscreenControl: false }}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input type="text" placeholder="Enter your Address" className={inputStyle} />
        </Autocomplete>
        {/* Child components, like markers, info windows, etc. */}
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default Map;
