const express = require("express");

import * as placeControllers from "../controllers/places";

const router = express.Router();

router.get("/", placeControllers.getAllPlaces);
router.get("/:placeId", placeControllers.getPlaceById);
router.get("/user/:userId", placeControllers.getPlacesByUserId);

export default router;
