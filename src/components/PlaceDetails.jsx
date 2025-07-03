import { MapPin, Phone } from "lucide-react";
import { FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
// import barImg from "../assets/bar.jpg";
import gardenImg from "../assets/garden.webp";
import cafeImg from "../assets/cafe.jpeg";
import movieImg from "../assets/movie.jpg";

const categoryImages = {
  "4bf58dd8d48988d16d941735": cafeImg,
  "4bf58dd8d48988d163941735": gardenImg,
  "4bf58dd8d48988d17f941735": movieImg,
  "4bf58dd8d48988d116941735": cafeImg,
};

const PlaceDetails = ({ place }) => {
  const categoryId = place?.categories?.[0]?.fsq_category_id;

  const fallbackImage =
    place?.categories?.[0]?.icon?.prefix +
    "bg_120" +
    place?.categories?.[0]?.icon?.suffix;

  const imageSrc =
    categoryImages[categoryId] ||
    (place?.photos?.[0]?.prefix
      ? `${place.photos[0].prefix}original${place.photos[0].suffix}`
      : fallbackImage);

  return (
    <div className="min-w-[280px] max-w-[300px] flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-white via-rose-50 to-emerald-50 shadow-md border border-rose-100 hover:shadow-lg transition-all duration-300">
      <img
        src={imageSrc}
        alt={place?.name}
        className="w-full h-[160px] object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          {place?.name}
        </h2>

        <p className="flex items-start gap-2 text-sm text-gray-600 leading-snug min-h-[40px]">
          <MapPin className="text-emerald-500 w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis block">
            {(
              place?.location?.formatted_address || "Address not available"
            ).trim()}
          </span>
        </p>

        {place?.tel ? (
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <Phone className="text-emerald-500 w-4 h-4" />
            {place.tel}
          </p>
        ) : (
          <p className="flex items-center gap-1 text-sm text-gray-400 italic">
            <Phone className="text-gray-300 w-4 h-4" />
            Not available
          </p>
        )}

        <p className="text-sm text-gray-500 italic min-h-[20px]">
          {place?.distance
            ? `${(place.distance / 1000).toFixed(1)} km away`
            : "Distance not available"}
        </p>

        <div className="flex flex-wrap gap-2 mt-2 min-h-[24px]">
          {place?.categories?.length > 0 ? (
            <>
              {place.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat.fsq_category_id}
                  className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
              {place.categories.length > 3 && (
                <span className="text-[10px] text-gray-400 italic">
                  +{place.categories.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="text-[10px] text-gray-400 italic">
              No category info
            </span>
          )}
        </div>
      </div>

      {(place?.website || place?.social_media) && (
        <div className="flex gap-3 px-4 pb-3 pt-2 border-t border-gray-100 justify-start items-center text-xs text-gray-600">
          {place?.website ? (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaGlobe className="w-3 h-3" /> Website
            </a>
          ) : (
            <span className="text-xs text-gray-400 italic">
              Website: Not available
            </span>
          )}
          {place?.social_media?.instagram && (
            <a
              href={`https://instagram.com/${place.social_media.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline flex items-center gap-1"
            >
              <FaInstagram className="w-3 h-3" /> Insta
            </a>
          )}
          {place?.social_media?.twitter && (
            <a
              href={`https://twitter.com/${place.social_media.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
              <FaTwitter className="w-3 h-3" /> Twitter
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
