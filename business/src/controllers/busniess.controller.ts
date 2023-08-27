import { NextFunction, Request, Response, query } from "express";
import * as db from "../utils/db/business.db";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import producer from "../rabbit/producer";

export const addBusiness = [
  body("city").trim().notEmpty().withMessage("You must supply a city"),
  body("state").trim().notEmpty().withMessage("You must supply a state "),
  body("business_Type")
    .trim()
    .notEmpty()
    .withMessage("You must supply a business Type "),
  body("country").trim().notEmpty().withMessage("You must supply a country "),
  body("latitude")
    .trim()
    .notEmpty()
    .isFloat()
    .withMessage("You must supply a latitude "),
  body("longitude")
    .trim()
    .notEmpty()
    .isFloat()
    .withMessage("You must supply a longitude"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = 0; //0 means created or updated
    try {
      const { city, business_Type, state, country, latitude, longitude } =
        req.body;
      const business = await db.addBusiness({
        user_id: "xof",
        business_Type,
        city,
        state,
        country,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      await producer.publishMessage(
        JSON.stringify({ subject, business }) //0 means created or updated
      );
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
  body("business_Type")
    .trim()
    .notEmpty()
    .withMessage("You must supply a business Type "),
  body("country")
    .trim()
    .notEmpty()
    .isFloat()
    .withMessage("You must supply a country "),
  body("latitude")
    .trim()
    .notEmpty()
    .isFloat()
    .withMessage("You must supply a latitude "),
  body("longtiude")
    .trim()
    .notEmpty()
    .withMessage("You must supply a longtiude"),
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = 0; //0 means created or updated
    try {
      const {
        city,
        state,
        business_Type,
        country,
        latitude,
        longitude,
        business_id,
      } = req.body;
      const business = await db.updateBusiness({
        user_id: "xof",
        business_Type,
        city,
        state,
        country,
        latitude: Number(latitude),
        longitude: Number(longitude),
        business_id,
      });
      await producer.publishMessage(JSON.stringify({ subject, business }));
      res.status(200).json(business);
    } catch (err) {
      next(err);
    }
  },
];
export const removeBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = 1; //1 means removed
  try {
    const business = await db.removeBusiness(req.params.businessId);
    await producer.publishMessage(JSON.stringify({ subject, business }));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export const getBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const business = await db.getBusiness(req.params.businessId);
    if (!business) {
      return res.status(404).json({
        errors: [
          {
            message: "User not found",
          },
        ],
      });
    }
    res.status(200).json(business);
  } catch (err) {
    next(err);
  }
};
