import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
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
    if (bounds?.sw && bounds?.ne) {
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
      });
    }
  }, [coordinates, bounds]);

  return (
    <main className="w-full">
      <Header />

      <div className="flex flex-col md:flex-row gap-6 px-4 mt-6">
        <div className="md:w-1/3 w-full">
          <List places={places} />
        </div>

        <div className="md:w-2/3 w-full">
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            bounds={bounds}
            places={places}
          />
        </div>
      </div>

    </main>
  );
};

export default App;
