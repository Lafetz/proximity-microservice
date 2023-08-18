import { Review } from "@prisma/client";
import { ReviewAdd } from "../../types/models";
import prisma from "./client";

export const addReview = async (review: ReviewAdd) => {
  return await prisma.review.create({ data: review });
};
export const getReview = async (reviewId: string) => {
  return await prisma.review.findUnique({ where: { review_id: reviewId } });
};
export const getReviews = async (businessId: string) => {
  return await prisma.review.findMany({ where: { business_id: businessId } });
};
export const updateReview = async (review: Review) => {
  return await prisma.review.update({
    where: { review_id: review.review_id },
    data: review,
  });
};
export const removeReview = async (reviewId: string) => {
  return await prisma.review.delete({ where: { review_id: reviewId } });
};
