import * as jwt from "jsonwebtoken";
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn,
  });
}
