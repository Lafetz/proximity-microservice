import { NextFunction, Request, Response } from "express";
import { searchBusiness } from "../utils/redis_geo/redis_geo";
import { getBusinesses } from "../utils/redis _info/redis_info";
export const getNearby = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessType, longitude, latitude, radius } = req.body;

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
};
