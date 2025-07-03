import React, { useState, useEffect, useRef } from "react";
import PlaceDetails from "./PlaceDetails";
import { motion } from "framer-motion";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  sortBy,
  setSortBy,
}) => {
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
        className="text-2xl font-bold text-rose-400 mb-6 italic tracking-wide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Wandered Places Near You..
      </motion.h2>

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
            className="w-full border border-rose-300 rounded-lg shadow-sm p-2 bg-white focus:ring-2 focus:ring-rose-300 focus:outline-none"
          >
            <option value="4bf58dd8d48988d16d941735">Cafes</option>
            <option value="4bf58dd8d48988d163941735">Parks</option>
            <option value="4bf58dd8d48988d17f941735">Movie Theatres</option>
            <option value="4bf58dd8d48988d116941735">Bars</option>
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
            className="w-full border border-rose-300 rounded-lg shadow-sm p-2 bg-white focus:ring-2 focus:ring-rose-300 focus:outline-none"
          >
            <option value="relevance">Relevance</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-rose-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {places?.length === 0 && !isLoading && (
            <p className="text-center text-sm text-gray-500 italic">
              Nothing to show yet... try changing filters!
            </p>
          )}

          <div className="flex gap-4 overflow-x-auto px-2 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-rose-100 h-[400px]">
            {places
              ?.filter((place) => place?.name && place?.location)
              .map((place, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  ref={(el) => (listRef.current[i] = el)}
                  className="min-w-[320px] max-w-[320px] h-full flex-shrink-0"
                >
                  <PlaceDetails place={place} />
                </motion.div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
