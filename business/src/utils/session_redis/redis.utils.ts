import * as Redis from "redis";
//import { v4 as uuidv4 } from "uuid";
const client = Redis.createClient({
  url: "redis://auth-redis",
}); //
client.connect().catch(console.error);

export const getSession = async (sessionId: string) => {
  const session = await client.get(sessionId);
  return session;
};
//
