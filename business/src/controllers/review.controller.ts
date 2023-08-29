import { NextFunction, Request, Response } from "express";
import * as db from "../utils/db/review.db";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import producer from "../rabbit/producer";
export const addReview = [
  body("business_id")
    .trim()
    .notEmpty()
    .withMessage("You must supply a business_id"),
  body("content").trim().notEmpty().withMessage("You must supply  content "),
  body("score")
    .trim()
    .isNumeric()
    .isInt({ max: 5, min: 0 })
    .withMessage("You must supply correct score"),
  body("date").trim().notEmpty().withMessage("You must supply Date"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { business_id, content, score, date } = req.body;
      const review = await db.addReview({
        //@ts-ignore
        user_id: req.user.userId,
        business_id,
        content,
        score: Number(score),
        date: new Date(date),
      });
      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  },
];
export const getReview = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await db.getReview(req.params.reviewId);
      if (!review) {
        return res.status(400).json({ message: "review not found" });
      }
      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  },
];
export const getReviews = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await db.getReviews(req.params.businessId);
      res.status(200).json(reviews);
    } catch (err) {
      next(err);
    }
  },
];
export const updateReview = [
  body("business_id")
    .trim()
    .notEmpty()
    .withMessage("You must supply a business_id"),
  body("content").trim().notEmpty().withMessage("You must supply  content "),
  body("score")
    .trim()
    .isNumeric()
    .isInt({ max: 5, min: 0 })
    .withMessage("You must supply correct score"),
  body("date").trim().notEmpty().withMessage("You must supply Date"),
  body("review_id").trim().notEmpty().withMessage("You must supply ReviewId"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user_id = req.user.userId;
    try {
      const { business_id, content, score, date, review_id } = req.body;
      const review = await db.updateReview(
        {
          review_id,
          user_id,
          business_id,
          content,
          score: Number(score),
          date,
        },
        user_id
      );

      res.status(200).json(review);
    } catch (err) {
      next(err);
    }
  },
];
export const removeReview = [
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user_id = req.user.userId;
    try {
      await db.removeReview(req.params.reviewId, user_id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
];
