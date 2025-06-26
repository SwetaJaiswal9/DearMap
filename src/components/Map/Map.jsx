import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const center = { lat: 51.5072, lng: -0.1276 };

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // libraries: ["marker"],
    libraries: [],
  });

  const [map, setMap] = useState(null);
  //  const markerRef = useRef(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && window.google && window.google.maps?.marker) {
      new window.google.maps.Marker({
        map,
        position: center,
      });
    }
    // {
    //   markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
    //     map,
    //     position: center,
    //   });
    // }
  }, [isLoaded, map]);

  return (
    <div className="rounded-md shadow-md overflow-hidden border border-gray-300">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        ></GoogleMap>
      )}
    </div>
  );
};

export default Map;
