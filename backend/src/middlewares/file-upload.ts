import multer from "multer";
import uuid from "uuid/v1";
import HttpError from "../models/http-error";
import { NextFunction, Request, Response } from "express";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
} as any;

const fileUpload = multer({
  limits: {
    fileSize: 500000
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${uuid().toString()}.${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : (new HttpError("Invalid type!", 400) as any);
    cb(error, isValid);
  }
});

const upload = fileUpload.single("image");

export const uploadMiddleWare =  (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      console.log('A Multer error occurred when uploading', err)
    } else if (err) {
      console.log('An unknown error occurred when uploading', err)
    }
    next();
  });
};
