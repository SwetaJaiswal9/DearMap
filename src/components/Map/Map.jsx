import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useRef, useState, useCallback } from "react";
import barImg from "../../assets/bar.jpg";
import { MdLocationOn } from "react-icons/md";

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

    const newBounds = map?.getBounds();
    const ne = newBounds?.getNorthEast();
    const sw = newBounds?.getSouthWest();

    const updatedBounds = {
      ne: { lat: ne?.lat(), lng: ne?.lng() },
      sw: { lat: sw?.lat(), lng: sw?.lng() },
    };

    if (!bounds || JSON.stringify(bounds) !== JSON.stringify(updatedBounds)) {
      setBounds(updatedBounds);

      const newCenter = {
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
      };

      if (
        coordinates.lat !== newCenter.lat ||
        coordinates.lng !== newCenter.lng
      ) {
        setCoordinates(newCenter);
      }
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
          onIdle={handleIdle}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {places?.map((place, i) => (
            <Marker
              key={i}
              position={{
                lat: Number(place.latitude),
                lng: Number(place.longitude),
              }}
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
          ))}

          {selectedPlaceIndex !== null && places[selectedPlaceIndex] && (
            <InfoWindow
              position={{
                lat: Number(places[selectedPlaceIndex].latitude),
                lng: Number(places[selectedPlaceIndex].longitude),
              }}
              onCloseClick={() => setSelectedPlaceIndex(null)}
            >
              <div className="w-56">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {places[selectedPlaceIndex].name}
                </h3>
                <img
                  src={
                    places[selectedPlaceIndex]?.photo
                      ? places[selectedPlaceIndex].photo.images.large.url
                      : barImg
                  }
                  alt={places[selectedPlaceIndex].name}
                  className="w-full h-24 object-cover rounded mt-2"
                />
                {places[selectedPlaceIndex]?.rating && (
                  <div className="text-yellow-500 text-xs mt-2 font-medium">
                    ⭐ {Number(places[selectedPlaceIndex].rating)} / 5
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
