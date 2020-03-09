import { Router } from "express";
import { check } from "express-validator";

import * as placeControllers from "../controllers/places";
import { uploadMiddleWare } from "../middlewares/file-upload";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", placeControllers.getAllPlaces);
router.get("/user/:userId", placeControllers.getPlacesByUserId);
router.get("/:placeId", placeControllers.getPlaceById);

router.use(authMiddleware);
router.post(
  "/",
  uploadMiddleWare,
  [
    check("title")
      .not()
      .isEmpty()
      .isString(),
    check("description").isLength({ min: 5 }),
    check("address")
      .not()
      .isEmpty()
      .isString()
  ],
  placeControllers.createPlace
);
router.patch(
  "/:placeId",
  [
    check("title")
      .not()
      .isEmpty()
      .isString(),
    check("description").isLength({ min: 5 })
  ],
  placeControllers.updatePlace
);
router.delete("/:placeId", placeControllers.deletePlace);

export default router;
