"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = require("dotenv");
var http_error_1 = __importDefault(require("../models/http-error"));
dotenv_1.config();
exports.authMiddleware = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        var token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error();
        }
        var decodedToken = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (e) {
        return next(new http_error_1["default"]("Invalid Token", 401));
    }
};
