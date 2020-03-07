"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var multer_1 = __importDefault(require("multer"));
var v1_1 = __importDefault(require("uuid/v1"));
var http_error_1 = __importDefault(require("../models/http-error"));
var MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};
exports.fileUpload = multer_1["default"]({
    limits: {
        fileSize: 500000
    },
    storage: multer_1["default"].diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/images");
        },
        filename: function (req, file, cb) {
            var ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, v1_1["default"]().toString() + "." + ext);
        }
    }),
    fileFilter: function (req, file, cb) {
        var isValid = !!MIME_TYPE_MAP[file.mimetype];
        var error = isValid ? null : new http_error_1["default"]("Invalid type!", 400);
        cb(error, isValid);
    }
});
