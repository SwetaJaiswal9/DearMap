import { MapPin, Phone } from "lucide-react";
import { FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
import barImg from "../../assets/bar.jpg";

const PlaceDetails = ({ place }) => {
  const fallbackImage =
    place?.categories?.[0]?.icon?.prefix +
    "bg_120" +
    place?.categories?.[0]?.icon?.suffix;

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)]">
      <img
        src={barImg || fallbackImage}
        alt={place?.name}
        className="w-full h-[220px] object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{place?.name}</h2>

        {place?.location?.formatted_address && (
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="text-emerald-500 w-4 h-4" />
            {place.location.formatted_address}
          </p>
        )}

        {place?.tel && (
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <Phone className="text-emerald-500 w-4 h-4" />
            {place.tel}
          </p>
        )}

        {place?.distance && (
          <p className="text-sm text-gray-500">
            {(place.distance / 1000).toFixed(1)} km away
          </p>
        )}

        {place?.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {place.categories.map((cat) => (
              <span
                key={cat.fsq_category_id}
                className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {(place?.website || place?.social_media) && (
        <div className="flex gap-4 p-4 pt-2 border-t border-gray-100 justify-end items-center text-sm">
          {place?.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaGlobe /> Website
            </a>
          )}
          {place?.social_media?.instagram && (
            <a
              href={`https://instagram.com/${place.social_media.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline flex items-center gap-1"
            >
              <FaInstagram /> Instagram
            </a>
          )}
          {place?.social_media?.twitter && (
            <a
              href={`https://twitter.com/${place.social_media.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
              <FaTwitter /> Twitter
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
