import * as Redis from "redis";
const client = Redis.createClient({
  url: "redis://business-info",
});
client.connect().catch(console.error);
export const addBusinessInfo = async (businessId: string, business: string) => {
  const value = await client.set(businessId, business);
  if (value !== "OK") {
    console.error("buinessInfo couldn't be added");
  }
};
export const getBusinesses = async (...args: string[]) => {
  return await client.mGet([...args]);
};
export const removeBusinessInfo = async (businessId: string) => {
  const value = await client.del(businessId);
  if (value === 0) {
    console.error("buinessInfo couldn't be removed");
  }
};
