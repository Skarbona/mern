"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_error_1 = __importDefault(require("../models/http-error"));
var unHandledRoutes = function (req, res, next) {
    throw new http_error_1["default"]("Could not find this route.", 404);
};
exports["default"] = unHandledRoutes;
