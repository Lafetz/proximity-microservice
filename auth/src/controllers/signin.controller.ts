import * as db from "../utils/db/users.db";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { signJWT } from "../utils/jwt.utils";
import { generateSession } from "../utils/redis.utils";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
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
          res.sendStatus(401).json("incorrect password!");
          return next();
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
          secure: true,
          httpOnly: true,
        });
        res
          .cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000, //1 month
            secure: true,
            httpOnly: true,
          })
          .status(200)
          .json("login success!");
      } else {
        res.status(500).json("User not found");
      }
    } catch (err) {
      if (typeof err === "string") {
        res.status(500).json(err);
      } else if (err instanceof Error) {
        res.status(500).json(err.message);
      }
    }
  },
];
