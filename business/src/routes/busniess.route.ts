import express from "express";
import * as businessController from "../controllers/busniess.controller";
import { requireUser } from "../middlewares/requireUser";
const router = express.Router();

router.get("/api/v1/businesses/:businessId", businessController.getBusiness);
router.post("/api/v1/businesses", requireUser, businessController.addBusiness);
router.put(
  "/api/v1/businesses/:businessId",
  requireUser,
  businessController.updateBusiness
);
router.delete(
  "/api/v1/businesses/:businessId",
  requireUser,
  businessController.removeBusiness
);

export { router as busniessRoute };
//
