import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const Map = ({ setCoordinates, setBounds, coordinates, bounds }) => {
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
        position: coordinates,
      });
    }

    // {
    //   markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
    //     map,
    //     position: coordinates,
    //   });
    // }
  }, [isLoaded, map]);

  const handleIdle = () => {
    const newBounds = map?.getBounds();
    const ne = newBounds?.getNorthEast();
    const sw = newBounds?.getSouthWest();

    const updatedBounds = {
      ne: { lat: ne?.lat(), lng: ne?.lng() },
      sw: { lat: sw?.lat(), lng: sw?.lng() },
    };

    if (
      !bounds ||
      bounds.ne.lat !== updatedBounds.ne.lat ||
      bounds.ne.lng !== updatedBounds.ne.lng ||
      bounds.sw.lat !== updatedBounds.sw.lat ||
      bounds.sw.lng !== updatedBounds.sw.lng
    ) {
      setBounds(updatedBounds);
      setCoordinates({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
      });
    }
  };

  return (
    <div className="rounded-md shadow-md overflow-hidden border border-gray-300">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
          onIdle={handleIdle}
        ></GoogleMap>
      )}
    </div>
  );
};

export default Map;
