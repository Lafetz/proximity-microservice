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
  const value = await client.geoAdd(businessType, {
    longitude,
    latitude,
    member: businessId,
  });
  if (value === 0) {
    console.error("buinessGeo couldn't be added");
  }
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
export const removeBusinessGeo = async (
  businessType: string,
  businessId: string
) => {
  const value = await client.zRem(businessType, businessId);
  if (value === 0) {
    console.error("buinessGeo couldn't be removed");
  }
};
