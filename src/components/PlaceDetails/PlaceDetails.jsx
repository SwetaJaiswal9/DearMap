import React from "react";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { FaStar, FaTripadvisor, FaGlobe } from "react-icons/fa";
import barImg from "../../assets/bar.jpg";

const PlaceDetails = ({ place }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)]">
      {/* Image */}
      <img
        src={place?.photo ? place.photo.images.large.url : barImg}
        alt={place?.name}
        className="w-full h-[220px] object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{place?.name}</h2>

        {/* Rating and Reviews */}
        <div className="flex justify-between text-sm text-gray-600 items-center">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar className="text-sm" />
            <span>{place?.rating || "N/A"}</span>
            <span className="text-gray-400 text-xs">({place?.num_reviews} reviews)</span>
          </div>
          <span className="text-xs text-gray-500">{place?.price_level}</span>
        </div>

        {/* Ranking */}
        <div className="text-xs text-gray-500">
          <strong className="font-medium text-gray-600">Ranking:</strong> {place?.ranking}
        </div>

        {/* Cuisine Tags */}
        {place?.cuisine?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {place.cuisine.map(({ name }) => (
              <span
                key={name}
                className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Location & Phone */}
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          {place?.address && (
            <p className="flex items-center gap-1">
              <MdLocationOn className="text-emerald-500" />
              <span>{place.address}</span>
            </p>
          )}

          {place?.phone && (
            <p className="flex items-center gap-1">
              <MdPhone className="text-emerald-500" />
              <span>{place.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {(place?.web_url || place?.website) && (
        <div className="flex gap-4 p-4 pt-2 border-t border-gray-100 justify-end">
          {place?.web_url && (
            <button
              onClick={() => window.open(place.web_url, "_blank")}
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <FaTripadvisor className="text-green-600" /> TripAdvisor
            </button>
          )}
          {place?.website && (
            <button
              onClick={() => window.open(place.website, "_blank")}
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <FaGlobe className="text-blue-600" /> Website
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
