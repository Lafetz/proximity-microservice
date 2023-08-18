import { Business, Review } from "@prisma/client";
export type BusinessAdd = Omit<Business, "business_id">;
export type ReviewAdd = Omit<Review, "review_id">;
