import { Business } from "@prisma/client";
import prisma from "./client";
import { BusinessAdd } from "../../types/models";

export const getBusiness = async (businessId: string) => {
  return await prisma.business.findUnique({
    where: { business_id: businessId },
  });
};
export const addBusiness = async (business: BusinessAdd) => {
  return await prisma.business.create({ data: business });
};
export const updateBusiness = async (business: Business) => {
  return await prisma.business.update({
    where: { business_id: business.business_id },
    data: business,
  });
};
export const removeBusiness = async (businessId: string) => {
  return await prisma.business.delete({ where: { business_id: businessId } });
};
