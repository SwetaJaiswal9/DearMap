import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    console.log("coordinates", coordinates);
    console.log("bounds", bounds);
    if (bounds?.sw && bounds?.ne) {
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      console.log("data", data);
      setPlaces(data);
    });
  }
  }, [coordinates, bounds]);

  return (
    <main className="w-full">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-6">
        <div>
          <List />
        </div>

        <div>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            bounds={bounds}
          />
        </div>
      </div>

      <PlaceDetails />
    </main>
  );
};

export default App;
