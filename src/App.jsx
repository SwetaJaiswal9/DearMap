import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData } from "./api";
import throttle from "lodash.throttle";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);

  const throttledFetchPlaces = useMemo(() => {
    return throttle(async (sw, ne) => {
      const data = await getPlacesData(sw, ne);
      setPlaces(data);
    }, 15000);
  }, []);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    },
    () => {
      //Default Location if permission denied - London
      setCoordinates({ lat: 51.5072, lng: -0.1276 });
    }
  );
}, []);


  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      throttledFetchPlaces(bounds.sw, bounds.ne);
    }
  }, [bounds, throttledFetchPlaces]);

  return (
    <main className="w-full">
      <Header />

      <div className="flex flex-col md:flex-row gap-6 px-4 mt-6">
        <div className="md:w-1/3 w-full">
          <List places={places} childClicked={childClicked} />
        </div>

        <div className="md:w-2/3 w-full">
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            bounds={bounds}
            places={places}
            setChildClicked={setChildClicked}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
