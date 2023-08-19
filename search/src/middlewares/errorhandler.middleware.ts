import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code == "P2025") {
      return res
        .status(400)
        .json({ errors: [{ message: "Requested data doesn't exist" }] });
    }
    return res.status(400).json({ errors: [{ message: "Database Error" }] });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
