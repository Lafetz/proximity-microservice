import { NextFunction, Request, Response } from "express";
import * as db from "../utils/db/business.db";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";

export const getBusinesses = [
  body("businessId")
    .trim()
    .notEmpty()
    .withMessage("You must supply businessId"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
      const business = await db.getBusiness(req.body.businessId);
      res.status(200).json(business);
      next(err);
    }
  },
];
