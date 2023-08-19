import express from "express";
import * as businessController from "../controllers/busniess.controller";
const router = express.Router();

router.get("/api/v1/businesses/:businessId", businessController.getBusiness);
router.post("/api/v1/businesses", businessController.addBusiness);
router.put("/api/v1/businesses/:businessId", businessController.updateBusiness);
router.delete(
  "/api/v1/businesses/:businessId",
  businessController.removeBusiness
);

export { router as busniessRoute };
