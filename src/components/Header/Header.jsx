import { useRef, useEffect } from "react";
import { Search } from "lucide-react";

const Header = ({ isLoaded, onPlaceChanged }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const autoCompleteEl = inputRef.current;

    if (!autoCompleteEl || !autoCompleteEl.addEventListener) return;

    const handlePlaceChanged = () => {
      const place = autoCompleteEl.getPlace?.();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onPlaceChanged({ lat, lng });
      }
    };

    autoCompleteEl.addEventListener(
      "gmpx-placeautocomplete:place_changed",
      handlePlaceChanged
    );

    return () => {
      autoCompleteEl.removeEventListener(
        "gmpx-placeautocomplete:place_changed",
        handlePlaceChanged
      );
    };
  }, [onPlaceChanged]);

  return (
    <header className="bg-gradient-to-r from-indigo-200 via-purple-100 to-teal-100 text-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-wider text-violet-500 drop-shadow-md italic underline-offset-4 decoration-purple-300">
          WanderFlow
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3 mt-3 md:mt-0">
          <p className="text-base md:text-lg font-medium italic text-emerald-700">
            Your journey begins here ✈️
          </p>

          {isLoaded && (
            <gmpx-placeautocomplete ref={inputRef} style={{ all: "unset" }}>
              <div className="relative bg-white rounded-lg px-3 py-2 flex items-center w-72 text-gray-800 shadow-sm border border-gray-300">
                <Search className="w-5 h-5 text-indigo-400 mr-2" />

                <input
                  // ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  className="outline-none w-full bg-transparent placeholder-gray-500"
                />
              </div>
            </gmpx-placeautocomplete>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
