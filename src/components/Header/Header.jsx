import { useRef } from "react";
import { Search } from "lucide-react";

const Header = () => {
  const inputRef = useRef(null);

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

          <div className="relative bg-white rounded-lg px-3 py-2 flex items-center w-72 text-gray-800 shadow-sm border border-gray-300">
            <Search className="w-5 h-5 text-indigo-400 mr-2" />

            {/* <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" /> */}

            {/* <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg> */}

            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="outline-none w-full bg-transparent placeholder-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
