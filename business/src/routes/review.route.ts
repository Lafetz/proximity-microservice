import express from "express";
import * as reviewController from "../controllers/review.controller";
const router = express.Router();
router.get(
  "/api/v1/businesses/:businessId/reviews",
  reviewController.getReviews
);
router.get(
  "/api/v1/businesses/:businessId/reviews/:reviewId",
  reviewController.getReview
);
router.put(
  "/api/v1/businesses/:businessId/reviews/:reviewId",
  reviewController.updateReview
);

router.delete(
  "/api/v1/businesses/:businessId/reviews/:reviewId",
  reviewController.removeReview
);

export { router as reviewRoute };
