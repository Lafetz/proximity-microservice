import * as Redis from "redis";
import { v4 as uuidv4 } from "uuid";
const client = Redis.createClient({
  url: "redis://auth-redis",
}); //
client.connect().catch(console.error);
export const generateSession = async (username: string) => {
  const sessionId = uuidv4();
  await client.set(sessionId, username);

  return sessionId;
};
