import * as db from "../utils/db/users.db";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { signJWT } from "../utils/jwt.utils";
import { generateSession } from "../utils/redis.utils";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { UnauthorizedAccess } from "../errors/unauthorized.error";
export const userLogin = [
  body("email").isEmail().withMessage("You must supply Email"),
  body("password").trim().notEmpty().withMessage("You must supply password"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.getUser(req.body.email);
      if (user) {
        const statusLogin = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!statusLogin) {
          throw new UnauthorizedAccess();
        }
        const accessToken = signJWT(
          {
            email: user.email,
            userId: user.id,
          },
          60 * 60 * 20 * 1000
        );
        const sessionId = await generateSession(user.email);
        const refreshToken = signJWT(
          {
            username: user.email,
            sessionId: sessionId,
            userId: user.id,
          },
          "30d"
        );
        res.cookie("refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000, //1 month

          httpOnly: true,
        });
        res.cookie("accessToken", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000, //1 month

          httpOnly: true,
        });
        res.status(200).json({ message: "login success!" });
      } else {
        throw new UnauthorizedAccess();
      }
    } catch (err) {
      next(err);
    }
  },
];
