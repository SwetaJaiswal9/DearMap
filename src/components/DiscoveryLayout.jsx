import Map from "./Map";
import List from "./List";
import { motion } from "framer-motion";

const DiscoveryLayout = ({
  places,
  coordinates,
  setCoordinates,
  bounds,
  setBounds,
  setChildClicked,
  childClicked,
  type,
  setType,
  sortBy,
  setSortBy,
  customPins,
  fetchCustomPins,
  handleDeletePin,
  isLoaded,
  isLoading,
}) => {
  return (
    <>
      <div className="relative w-full h-[calc(100vh-70px)]">
        {isLoaded && (
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            bounds={bounds}
            setBounds={setBounds}
            places={places}
            setChildClicked={setChildClicked}
            customPins={customPins}
            fetchCustomPins={fetchCustomPins}
            handleDeletePin={handleDeletePin}
          />
        )}
      </div>

      <List
        places={places}
        childClicked={childClicked}
        isLoading={isLoading}
        type={type}
        setType={setType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </>
  );
};

export default DiscoveryLayout;
