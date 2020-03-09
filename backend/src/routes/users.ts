import { Router } from "express";
import { check } from "express-validator";
import multer from 'multer';

import * as usersControllers from "../controllers/users";
import { fileUpload } from "../middlewares/file-upload";

const router = Router();
const single = fileUpload.single("image");

router.get("/", usersControllers.getAllUsers);

router.get("/:userId", usersControllers.getUserById); // Add Full control with DataBase

router.post(
  "/signup",
  function (req, res, next) {
    single(req, res, function(err: any) {
      if (err instanceof multer.MulterError) {
        console.log(111111111111111, err)
      } else if (err) {
        console.log(22222222222, err)
      }
      next();
    });
  },
  [
    check("name")
      .not()
      .isEmpty()
      .isString(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").isLength({ min: 6 })
  ],
  usersControllers.signUp
);

router.post("/login", usersControllers.login);

export default router;
