import { Router } from "express";
import { check } from "express-validator";

import * as placeControllers from "../controllers/places";

const router = Router();

router.get("/", placeControllers.getAllPlaces);
router.post(
  "/",
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
