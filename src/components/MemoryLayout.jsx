import Map from "./Map";

const MemoryLayout = ({
  coordinates,
  setCoordinates,
  bounds,
  setBounds,
  customPins,
  handleDeletePin,
  fetchCustomPins,
  isLoaded,
}) => {
  const hasPins = customPins && customPins.length > 0;

  return (
    <div className="relative w-full h-[calc(100vh-70px)]">
      {isLoaded && (
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          bounds={bounds}
          places={[]}
          customPins={customPins}
          fetchCustomPins={fetchCustomPins}
          handleDeletePin={handleDeletePin}
        />
      )}

      {!hasPins && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border text-center text-gray-700 text-sm z-30">
          Your memory pins will appear here 💭
        </div>
      )}
    </div>
  );
};

export default MemoryLayout;
