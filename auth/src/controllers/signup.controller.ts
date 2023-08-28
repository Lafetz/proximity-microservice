import { Request, Response, NextFunction } from "express";
import * as db from "../utils/db/users.db";
import bcrypt from "bcryptjs";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
export const userSignup = [
  body("email").isEmail().withMessage("You must supply Email"),
  body("password").trim().notEmpty().withMessage("You must supply password"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.createUser(req.body.email, hashedPassword);
      res.status(201).json({ message: "account created!" });
    } catch (err) {
      next(err);
    }
  },
];
//
//
