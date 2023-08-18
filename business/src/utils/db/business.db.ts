// GET /v1/businesses/:id
// POST /v1/businesses
// PUT /v1/businesses/:id

import { Business } from "@prisma/client";
import prisma from "./client";
import { BusinessAdd } from "../../types/models/business";

// DELETE /v1/businesses/:id
export const getBusiness = async (id: string) => {
  return await prisma.business.findUnique({ where: { business_id: id } });
};
export const addBusiness = async (business: BusinessAdd) => {
  return prisma.business.create({ data: business });
};
export const updateBusiness = async (business: Business) => {
  return await prisma.business.update({
    where: { business_id: business.business_id },
    data: business,
  });
};
export const removeBusiness = async (id: string) => {
  return await prisma.business.delete({ where: { business_id: id } });
};
