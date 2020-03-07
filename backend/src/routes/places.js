"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var placeControllers = __importStar(require("../controllers/places"));
var file_upload_1 = require("../middlewares/file-upload");
var auth_1 = require("../middlewares/auth");
var router = express_1.Router();
router.get("/", placeControllers.getAllPlaces);
router.get("/user/:userId", placeControllers.getPlacesByUserId);
router.get("/:placeId", placeControllers.getPlaceById);
router.use(auth_1.authMiddleware);
router.post("/", file_upload_1.fileUpload.single("image"), [
    express_validator_1.check("title")
        .not()
        .isEmpty()
        .isString(),
    express_validator_1.check("description").isLength({ min: 5 }),
    express_validator_1.check("address")
        .not()
        .isEmpty()
        .isString()
], placeControllers.createPlace);
router.patch("/:placeId", [
    express_validator_1.check("title")
        .not()
        .isEmpty()
        .isString(),
    express_validator_1.check("description").isLength({ min: 5 })
], placeControllers.updatePlace);
router["delete"]("/:placeId", placeControllers.deletePlace);
exports["default"] = router;
