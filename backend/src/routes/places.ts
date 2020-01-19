import { Router } from "express";

import * as placeControllers from "../controllers/places";

const router = Router();

router.get("/", placeControllers.getAllPlaces);
router.post("/", placeControllers.getAllPlaces);
router.get("/:placeId", placeControllers.getPlaceById);
router.get("/user/:userId", placeControllers.createPlace);

export default router;
