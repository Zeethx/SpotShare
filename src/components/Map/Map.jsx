import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import conf from "../../conf/conf";
import "./Map.css";

const libraries = ["places"];

function Map({ address, onAddressChange }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);

  const inputStyle = "absolute top-5 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md px-4 py-2 text-lg bg-white shadow-md rounded-full box-border";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: conf.googleMapsApiKey,
    libraries
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

        setMarkerPosition({ lat, lng });
        onAddressChange(address);
        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(15);
        }
      }
    }
  };

  useEffect(() => {
    if (address && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0].geometry.location) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          setMarkerPosition({ lat, lng });
          map.panTo({ lat, lng });
          map.setZoom(15);
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
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

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='map-container' style={{ width: '100%', height: '500px' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={markerPosition || { lat: 43.7, lng: -79.42 }}
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
    </div>
  );
}

export default Map;
