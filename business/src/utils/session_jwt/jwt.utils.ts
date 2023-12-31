import * as jwt from "jsonwebtoken";
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn,
  });
}
export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    console.log(decoded);

    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { payload: null, expired: true };
  }
};
