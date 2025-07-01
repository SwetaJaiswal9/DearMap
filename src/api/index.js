import axios from "axios";

const URL = "/api/places/search";

export const getPlacesData = async (sw, ne) => {
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

  try {
    const response = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
        authorization: `Bearer ${import.meta.env.VITE_FSQ_API_KEY}`,
      },
      params: {
        ll: `${lat},${lng}`,
        radius: 2000,
        fsq_category_ids: "4bf58dd8d48988d16d941735",
        limit: 30,
        sort: "DISTANCE",
        // fields: "fsq_place_id,name,location,categories,distance",
      },
    });

    return response.data.results;
  } catch (error) {
     console.error("Foursquare API error:", error?.response?.data || error.message);
  return [];
  }
};
