import prisma from "./client";

export const getUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
export const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: { email, password },
  });
  return user;
};
//
