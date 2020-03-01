import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import HttpError from "../models/http-error";

config();

export interface withAuthData extends Request {
  userData: {
    userId: string;
    email?: string;
  };
}

export const authMiddleware = (
  req: withAuthData,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_KEY
    ) as withAuthData["userData"];
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (e) {
    return next(new HttpError("Invalid Token", 401));
  }
};
