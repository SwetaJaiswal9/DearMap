import { useRef, useEffect, useState } from "react";
import { Search } from "lucide-react";

const Header = ({ isLoaded, onPlaceChanged }) => {
  const inputRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  <header
      className={`bg-gradient-to-r from-pink-100 via-rose-50 to-emerald-100 text-gray-900 transition-shadow duration-300 z-50 sticky top-0 ${
        scrolled ? "shadow-lg shadow-rose-200/50" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-wide text-rose-400 italic drop-shadow-md">
          DearMap
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3 mt-3 md:mt-0">
          <p className="text-base md:text-lg font-medium italic text-emerald-700">
            Where every place holds a piece of you...
          </p>

          {/* Search bar temporarily hidden — WORKING ON THIS */}
          
          {/* {isLoaded && (
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
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
