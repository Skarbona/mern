import { Router } from "express";
import { check } from "express-validator";

import * as placeControllers from "../controllers/places";
import { fileUpload } from "../middlewares/file-upload";

const router = Router();

router.get("/", placeControllers.getAllPlaces);
router.post(
  "/",
  fileUpload.single("image"),
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

router.get("/:placeId", placeControllers.getPlaceById);
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

router.get("/user/:userId", placeControllers.getPlacesByUserId);

export default router;
