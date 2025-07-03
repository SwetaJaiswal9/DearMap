import axios from "axios";

// const URL = `${import.meta.env.VITE_DEARMAP_SERVER}/api/places/search`;

const URL = "https://dearmap-server-production.up.railway.app";

const toRad = (value) => (value * Math.PI) / 180;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 1000;
};

export const getPlacesData = async (
  sw,
  ne,
  selectedType = "4bf58dd8d48988d16d941735",
  selectedSortBy = "DISTANCE"
) => {
  console.log("API URL: ", "https://dearmap-server-production.up.railway.app");
  if (
    !sw ||
    !ne ||
    sw.lat === 0 ||
    sw.lng === 0 ||
    ne.lat === 0 ||
    ne.lng === 0
  ) {
    console.warn("Skipping API call due to invalid bounds");
    return [];
  }

  const lat = (sw.lat + ne.lat) / 2;
  const lng = (sw.lng + ne.lng) / 2;

  const radius = Math.min(
    calculateDistance(sw.lat, sw.lng, ne.lat, ne.lng) / 2,
    50000
  );

  try {
    const response = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
        authorization: `Bearer ${import.meta.env.VITE_FSQ_API_KEY}`,
      },
      params: {
        ll: `${lat},${lng}`,
        radius: Math.floor(radius),
        limit: 30,
        fsq_category_ids: selectedType,
        sort: selectedSortBy,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error(
      "Foursquare API error:",
      error?.response?.data || error.message
    );
    return [];
  }
};
