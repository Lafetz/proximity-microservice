import express from "express";
import * as reviewController from "../controllers/review.controller";
import { requireUser } from "../middlewares/requireUser";
const router = express.Router();
router.get(
  "/api/v1/businesses/:businessId/reviews",
  reviewController.getReviews
);
router.get(
  "/api/v1/businesses/:businessId/reviews/:reviewId",
  requireUser,
  reviewController.getReview
);
router.put(
  "/api/v1/businesses/:businessId/reviews/:reviewId",
  requireUser,
  reviewController.updateReview
);
router.post(
  "/api/v1/businesses/:businessId/reviews",
  requireUser,
  reviewController.addReview
);
router.delete(
  "/api/v1/businesses/:businessId/reviews/:reviewId",
  requireUser,
  reviewController.removeReview
);

export { router as reviewRoute };
