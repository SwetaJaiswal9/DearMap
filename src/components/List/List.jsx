import React, { useState, useEffect, useRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { motion } from "framer-motion";

const List = ({ places, childClicked, isLoading }) => {
  const [type, setType] = useState("cafes");
  const [sortBy, setSortBy] = useState("distance");

  const listRef = useRef([]);

  console.log({ childClicked });

  useEffect(() => {
    if (childClicked !== null && listRef.current[childClicked]) {
      listRef.current[childClicked].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [childClicked]);

  return (
    <div className="p-6">
      <motion.h2
        className="text-2xl font-bold text-violet-500 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cafes around you
      </motion.h2>

      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-6 flex-col sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="cafes">Cafes</option>
                <option value="bars">Bars</option>
                <option value="parks">Parks</option>
                <option value="movie_theatres">Movie Theatres</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="sortBy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="relevance">Relevance</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
            {places
              ?.filter((place) => place?.name && place?.location)
              .map((place, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300"
                >
                  <div key={i} ref={(el) => (listRef.current[i] = el)}>
                    <PlaceDetails place={place} />
                  </div>
                </motion.div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
