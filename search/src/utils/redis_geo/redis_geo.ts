import * as Redis from "redis";

const client = Redis.createClient({
  url: "redis://geohash",
});
client.connect().catch(console.error);
export const addBusinessGeo = async (
  businessType: string,
  businessId: string,
  longitude: number,
  latitude: number
) => {
  await client.geoAdd(businessType, {
    longitude,
    latitude,
    member: businessId,
  });
};
export const searchBusiness = async (
  businessType: string,
  longitude: number,
  latitude: number,
  radius: number
) => {
  return await client.geoSearch(
    businessType,
    { latitude, longitude },
    { radius, unit: "km" }
  );
};
