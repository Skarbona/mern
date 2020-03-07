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
var usersControllers = __importStar(require("../controllers/users"));
var file_upload_1 = require("../middlewares/file-upload");
var router = express_1.Router();
router.get("/", usersControllers.getAllUsers);
router.get("/:userId", usersControllers.getUserById); // Add Full control with DataBase
router.post("/signup", file_upload_1.fileUpload.single("image"), [
    express_validator_1.check("name")
        .not()
        .isEmpty()
        .isString(),
    express_validator_1.check("email")
        .normalizeEmail()
        .isEmail(),
    express_validator_1.check("password").isLength({ min: 6 })
], usersControllers.signUp);
router.post("/login", usersControllers.login);
exports["default"] = router;
