import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import barImg from "../../assets/bar.jpg";
import { MapPin } from "lucide-react";
import AddPinForm from "./PinForm";
import { collection, addDoc } from "firebase/firestore";
import db from "../../utils/firebase";
import { motion } from "framer-motion";

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
  customPins,
  fetchCustomPins,
}) => {
  const [map, setMap] = useState(null);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [selectedCustomPin, setSelectedCustomPin] = useState(null);
  const [drawerPosition, setDrawerPosition] = useState("right");

  const handlePinSubmit = async (pinData) => {
    console.log("New Pin Data:", pinData);
    try {
      const docRef = await addDoc(collection(db, "pins"), pinData);
      console.log("Pin saved with ID:", docRef.id);
      if (fetchCustomPins) fetchCustomPins();
    } catch (error) {
      console.error("Error saving pin:", error);
    }
  };

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

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log("Map instance:", map);
    console.log("Clicked location:", clickedLocation);

    const clickX = e.domEvent.clientX;
    const windowWidth = window.innerWidth;

    if (clickX > windowWidth * 0.6) {
      setDrawerPosition("left");
    } else {
      setDrawerPosition("right");
    }

    setClickedLocation({ lat, lng });
  };

  return (
    <div className="relative rounded-md shadow-md overflow-hidden border border-gray-300">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={window.innerWidth < 640 ? 13 : 15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onIdle={handleIdle}
        onClick={handleMapClick}
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

        {customPins?.map((pin, index) => (
          <Marker
            key={`custom-${index}`}
            position={{ lat: pin.lat, lng: pin.lng }}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
              fillColor: "#38bdf8",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#fff",
              scale: 1.5,
              anchor: new window.google.maps.Point(12, 24),
            }}
            onClick={() => setSelectedCustomPin(pin)}
          />
        ))}

        {selectedCustomPin && (
          <InfoWindow
            position={{
              lat: selectedCustomPin.lat,
              lng: selectedCustomPin.lng,
            }}
            onCloseClick={() => setSelectedCustomPin(null)}
          >
            <div className="w-48 rounded-xl shadow-md bg-gradient-to-br from-sky-200 via-sky-100 to-emerald-100 border border-sky-300">
              <div className="px-3 py-2">
                <h3 className="text-sm font-semibold text-sky-800">
                  {selectedCustomPin.title}
                </h3>
                <p className="text-xs text-emerald-700 mt-1 leading-snug">
                  {selectedCustomPin.description}
                </p>
              </div>
            </div>
          </InfoWindow>
        )}

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

        {clickedLocation && (
          <Marker
            position={clickedLocation}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
              fillColor: "#3b82f6",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#fff",
              scale: 1.5,
              anchor: new window.google.maps.Point(12, 24),
            }}
          />
        )}
      </GoogleMap>

      {clickedLocation && (
        <div
          className={`absolute top-1/2 ${drawerPosition}-0 -translate-y-1/2 w-[320px] bg-gradient-to-br from-white via-sky-50 to-emerald-100 shadow-xl p-4 z-50 rounded-xl border border-sky-200 transition-all duration-300 ease-in-out`}
        >
          <AddPinForm
            location={clickedLocation}
            onClose={() => setClickedLocation(null)}
            onSubmit={handlePinSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default Map;
