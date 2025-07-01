import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useRef, useState, useCallback } from "react";
import barImg from "../../assets/bar.jpg";
import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  bounds,
  places,
  setChildClicked,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // libraries: ["marker"],
    libraries: [],
  });

  const [map, setMap] = useState(null);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);
  //  const markerRef = useRef(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleIdle = () => {
    if (!map) return;

    const newBounds = map.getBounds();
    const ne = newBounds?.getNorthEast();
    const sw = newBounds?.getSouthWest();

    const newCenter = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    };

    const updatedBounds = {
      ne: { lat: ne?.lat(), lng: ne?.lng() },
      sw: { lat: sw?.lat(), lng: sw?.lng() },
    };

    const isSubstantialDrag = () => {
      if (!coordinates) return true;
      const latDiff = Math.abs(coordinates.lat - newCenter.lat);
      const lngDiff = Math.abs(coordinates.lng - newCenter.lng);
      return latDiff > 0.005 || lngDiff > 0.005;
    };

    const isBoundsChanged = () => {
      if (!bounds) return true;
      return (
        Math.abs(bounds.ne.lat - updatedBounds.ne.lat) > 0.01 ||
        Math.abs(bounds.ne.lng - updatedBounds.ne.lng) > 0.01 ||
        Math.abs(bounds.sw.lat - updatedBounds.sw.lat) > 0.01 ||
        Math.abs(bounds.sw.lng - updatedBounds.sw.lng) > 0.01
      );
    };

    if (isSubstantialDrag() || isBoundsChanged()) {
      setCoordinates(newCenter);
      setBounds(updatedBounds);
    }
  };

  return (
    <div className="rounded-md shadow-md overflow-hidden border border-gray-300">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={window.innerWidth < 640 ? 13 : 15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onIdle={handleIdle}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {places?.map((place, i) => {
            const lat = Number(place?.latitude);
            const lng = Number(place?.longitude);

            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker
                key={i}
                position={{ lat, lng }}
                onClick={() => {
                  if (selectedPlaceIndex !== i) {
                    setChildClicked(i);
                    setSelectedPlaceIndex(i);
                  }
                }}
                icon={{
                  path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                  fillColor: "#ef4444",
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: "#fff",
                  scale: 1.5,
                  anchor: new window.google.maps.Point(12, 24),
                }}
              />
            );
          })}

          {selectedPlaceIndex !== null && places[selectedPlaceIndex] && (
            <InfoWindow
              position={{
                lat: places[selectedPlaceIndex]?.latitude,
                lng: places[selectedPlaceIndex]?.longitude,
              }}
              onCloseClick={() => setSelectedPlaceIndex(null)}
            >
              <div className="w-48 rounded-md shadow-md bg-white overflow-hidden border border-gray-200">
                <img
                  src={barImg}
                  alt={places[selectedPlaceIndex].name}
                  className="w-full h-24 object-cover"
                />

                <div className="px-2 py-1.5">
                  <h3 className="text-xs font-semibold text-gray-800 truncate">
                    {places[selectedPlaceIndex].name}
                  </h3>

                  {places[selectedPlaceIndex]?.location?.formatted_address && (
                    <p className="flex items-start gap-1 text-[10px] text-gray-600 mt-1 leading-snug">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 mt-[1px]" />
                      <span>
                        {places[selectedPlaceIndex].location.formatted_address}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
