import { NextFunction, Request, Response } from "express";
import { getSession } from "../utils/session_redis/redis.utils";

import { signJWT, verifyJWT } from "../utils/session_jwt/jwt.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    //valid token
    // @ts-ignore
    req.user = payload;
    return next();
  }
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  //logged in but expired
  // @ts-ignore
  const session = getSession(refresh.sessionId);
  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(session, 60 * 60 * 20);

  res.cookie("accessToken", newAccessToken, {
    maxAge: 60 * 60 * 24 * 30 * 1000, //1 month
    httpOnly: true,
  });

  // @ts-ignore

  req.user = verifyJWT(newAccessToken).payload;

  return next();
}

export default deserializeUser;
