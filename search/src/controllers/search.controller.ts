import { NextFunction, Request, Response } from "express";
import { searchBusiness } from "../utils/redis_geo/redis_geo";
import { getBusinesses } from "../utils/redis _info/redis_info";
import { query } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
export const getNearby = [
  query("businessType")
    .exists()
    .withMessage("You must supply a business Type "),
  query("latitude")
    .exists()
    .isFloat()
    .withMessage("You must supply a latitude "),
  query("longitude")
    .exists()
    .isFloat()
    .withMessage("You must supply a longitude"),
  query("radius").exists().isFloat().withMessage("You must supply radius"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { businessType, longitude, latitude, radius }: any = req.query;

      const businessIds = await searchBusiness(
        businessType,
        longitude,
        latitude,
        radius
      );
      if (businessIds.length === 0) {
        return res.sendStatus(204);
      }
      const businesses = await getBusinesses(...businessIds);
      res.status(200).json(businesses);
    } catch (err) {
      next(err);
    }
  },
];
