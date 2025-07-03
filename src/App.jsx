import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import List from "./components/List";
import Hero from "./components/Hero";
import { getPlacesData } from "./api";
import throttle from "lodash.throttle";
import { useLoadScript } from "@react-google-maps/api";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "./utils/firebase";

const libraries = ["places"];

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("4bf58dd8d48988d16d941735");
  const [sortBy, setSortBy] = useState("DISTANCE");
  const [customPins, setCustomPins] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handlePlaceChanged = ({ lat, lng }) => {
    setCoordinates({ lat, lng });
  };

  const throttledFetchPlaces = useMemo(() => {
    return throttle(
      async (
        sw,
        ne,
        selectedType = "4bf58dd8d48988d16d941735",
        selectedSortBy = "DISTANCE"
      ) => {
        setIsLoading(true);
        const data = await getPlacesData(sw, ne, selectedType, selectedSortBy);
        console.log("Fetched Places Data:", data);
        setIsLoading(false);
        setPlaces(data);
      },
      15000
    );
  }, []);

  const fetchCustomPins = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pins"));
      const pins = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomPins(pins);
      console.log("Custom Pins:", pins);
    } catch (err) {
      console.error("Failed to fetch pins:", err);
    }
  };
  const handleDeletePin = async (pinId) => {
    try {
      await deleteDoc(doc(db, "pins", pinId));
      fetchCustomPins();
    } catch (err) {
      console.error("Failed to delete pin:", err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      () => {
        //Default fallback - London
        setCoordinates({ lat: 51.5072, lng: -0.1276 });
      }
    );
  }, []);

  useEffect(() => {
    fetchCustomPins();
  }, []);

  useEffect(() => {
    if (
      bounds?.sw &&
      bounds?.ne &&
      bounds.sw.lat !== 0 &&
      bounds.sw.lng !== 0 &&
      bounds.ne.lat !== 0 &&
      bounds.ne.lng !== 0 &&
      coordinates.lat !== 0 &&
      coordinates.lng !== 0
    ) {
      throttledFetchPlaces(bounds.sw, bounds.ne, type, sortBy);
    }
  }, [bounds, throttledFetchPlaces, type, sortBy]);

  return (
    <main className="w-full">
      <Header isLoaded={isLoaded} onPlaceChanged={handlePlaceChanged} />
      <Hero />

      <div className="flex flex-col md:flex-row gap-6 px-4 mt-6">
        <div className="md:w-1/3 w-full">
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        <div className="md:w-2/3 w-full">
          {isLoaded && (
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              bounds={bounds}
              places={places}
              setChildClicked={setChildClicked}
              customPins={customPins}
              fetchCustomPins={fetchCustomPins}
              handleDeletePin={handleDeletePin}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
