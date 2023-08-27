import * as Redis from "redis";
const client = Redis.createClient({
  url: "redis://business-info",
});
client.connect().catch(console.error);
export const addBusinessInfo = async (businessId: string, business: string) => {
  await client.set(businessId, business);
};
export const getBusinesses = async (...args: string[]) => {
  return await client.mGet([...args]);
};
