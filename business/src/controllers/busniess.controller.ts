import { NextFunction, Request, Response } from "express";
import * as db from "../utils/db/business.db";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import producer from "../rabbit/producer";
export const addBusiness = [
  body("city").trim().notEmpty().withMessage("You must supply a city"),
  body("state").trim().notEmpty().withMessage("You must supply a  state "),
  body("country").trim().notEmpty().withMessage("You must supply a country "),
  body("latitude").trim().notEmpty().withMessage("You must supply a latitude "),
  body("longitude")
    .trim()
    .notEmpty()
    .withMessage("You must supply a longitude"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { city, state, country, latitude, longtiude } = req.body;
      const business = await db.addBusiness({
        user_id: "xof",
        city,
        state,
        country,
        latitude,
        longitude,
      });
      res.status(201).json(business);
    } catch (err) {
      next(err);
    }
  },
];
export const updateBusiness = [
  body("business_id")
    .trim()
    .notEmpty()
    .withMessage("You must supply  business_not_yet"),
  body("city").trim().notEmpty().withMessage("You must supply a city"),
  body("state").trim().notEmpty().withMessage("You must supply a  state "),
  body("country").trim().notEmpty().withMessage("You must supply a country "),
  body("latitude").trim().notEmpty().withMessage("You must supply a latitude "),
  body("longtiude")
    .trim()
    .notEmpty()
    .withMessage("You must supply a longtiude"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { city, state, country, latitude, longtiude, business_id } =
        req.body;
      const business = await db.updateBusiness({
        user_id: "xof",
        city,
        state,
        country,
        latitude,
        longitude,
        business_id,
      });
      res.status(200).json(business);
    } catch (err) {
      next(err);
    }
  },
];
export const removeBusiness = [
  body("businessId")
    .trim()
    .notEmpty()
    .withMessage("You must supply businessId"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.removeBusiness(req.body.businessId);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
];
export const getBusiness = [
  body("businessId")
    .trim()
    .notEmpty()
    .withMessage("You must supply businessId"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const business = await db.getBusiness(req.body.businessId);
      res.status(200).json(business);
    } catch (err) {
      next(err);
    }
  },
];
