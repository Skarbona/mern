"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var errorHandler = function (err, req, res, next) {
    if (req.file) {
        fs_1["default"].unlink(req.file.path, function (err) {
            console.log(err);
        });
    }
    if (res.headersSent) {
        return next(err);
    }
    res
        .status(err.code || 500)
        .json({ message: err.message || "An unknown error occurred!" });
};
exports["default"] = errorHandler;
