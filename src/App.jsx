import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { getPlacesData } from "./api";
import throttle from "lodash.throttle";
import { useLoadScript } from "@react-google-maps/api";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "./utils/firebase";
import DiscoveryLayout from "./components/DiscoveryLayout";
import MemoryLayout from "./components/MemoryLayout";
import TabSelector from "./components/TabSelector";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

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

  const [activeTab, setActiveTab] = useState("discovery");

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
      activeTab === "discovery" &&
      bounds?.sw &&
      bounds?.ne &&
      bounds.sw.lat !== 0 &&
      bounds.sw.lng !== 0 &&
      bounds.ne.lat !== 0 &&
      bounds.ne.lng !== 0 &&
      coordinates.lat !== 0 &&
      coordinates.lng !== 0
    ) {
      setIsLoading(true);
      throttledFetchPlaces(bounds.sw, bounds.ne, type, sortBy);
    }
  }, [bounds, throttledFetchPlaces, type, sortBy]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <main className="w-full">
      <Header isLoaded={isLoaded} onPlaceChanged={handlePlaceChanged} />

      <Hero
        onStart={() => {
          const el = document.getElementById("tab-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <div id="tab-section" className="pt-20">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "discovery" && (
          <p className="text-center text-sm text-gray-600 italic mb-4">
            Wander through the map and tap on any location 📍 to discover fun places, cozy corners, and favorite spots around you!
          </p>
        )}
        {activeTab === "memory" && (
          <p className="text-center text-sm text-gray-600 italic mb-4">
            Click anywhere on the map to drop a new memory, or tap on a pin ❤️ to view or delete it!
          </p>
        )}
      </div>

      {activeTab === "discovery" && (
        <DiscoveryLayout
          isLoaded={isLoaded}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          bounds={bounds}
          setBounds={setBounds}
          places={places}
          isLoading={isLoading}
          type={type}
          setType={setType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          childClicked={childClicked}
          setChildClicked={setChildClicked}
        />
      )}

      {activeTab === "memory" && (
        <MemoryLayout
          isLoaded={isLoaded}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          customPins={customPins}
          handleDeletePin={handleDeletePin}
          fetchCustomPins={fetchCustomPins}
          setBounds={setBounds}
        />
      )}

      <Footer />
    </main>
  );
};

export default App;
