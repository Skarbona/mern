import { NextFunction, Request, Response } from "express";
import fs from "fs";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
        console.log(err)
    });
  }
  if (res.headersSent) {
    return next(err);
  }

  res
    .status(err.code || 500)
    .json({ message: err.message || "An unknown error occurred!" });
};

export default errorHandler;
