import { Router } from "express";
import { check } from "express-validator";

import * as usersControllers from "../controllers/users";
import { uploadMiddleWare } from "../middlewares/file-upload";

const router = Router();

router.get("/", usersControllers.getAllUsers);

router.get("/:userId", usersControllers.getUserById); // Add Full control with DataBase

router.post(
  "/signup",
  uploadMiddleWare,
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
