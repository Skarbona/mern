"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var fs_1 = __importDefault(require("fs"));
var http_error_1 = __importDefault(require("../models/http-error"));
var google_map_1 = __importDefault(require("../util/google-map"));
var place_1 = __importDefault(require("../models/place"));
var user_1 = __importDefault(require("../models/user"));
exports.getAllPlaces = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var places, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, place_1["default"].find()];
            case 1:
                places = _a.sent();
                res.json(places.map(function (place) { return place.toObject({ getters: true }); }));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Something went wrong, could not find place", 500))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPlaceById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var placeId, place, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                placeId = req.params.placeId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, place_1["default"].findById(placeId)];
            case 2:
                place = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Something went wrong, could not find place", 500))];
            case 4:
                if (!place) {
                    return [2 /*return*/, next(new http_error_1["default"]("Could not find resources for provided Id", 404))];
                }
                res.json({ place: place.toObject({ getters: true }) });
                return [2 /*return*/];
        }
    });
}); };
exports.getPlacesByUserId = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, places, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, place_1["default"].find({ creator: userId })];
            case 2:
                places = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Something went wrong, could not find places", 500))];
            case 4:
                if (!places.length) {
                    return [2 /*return*/, next(new http_error_1["default"]("Could not find resources for provided Id", 404))];
                }
                res.json({ places: places.map(function (place) { return place.toObject({ getters: true }); }) });
                return [2 /*return*/];
        }
    });
}); };
exports.createPlace = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, title, description, address, coordinates, e_4, creator, createdPlace, user, e_5, session, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = express_validator_1.validationResult(req);
                if (!error.isEmpty()) {
                    return [2 /*return*/, next(new http_error_1["default"]("Invalid inputs passed, please check your data.", 422))];
                }
                _a = req.body, title = _a.title, description = _a.description, address = _a.address;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, google_map_1["default"](address)];
            case 2:
                coordinates = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                return [2 /*return*/, next(e_4)];
            case 4:
                creator = req.userData.userId;
                createdPlace = new place_1["default"]({
                    title: title,
                    description: description,
                    imageUrl: req.file.path,
                    address: address,
                    location: coordinates,
                    creator: creator
                });
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, user_1["default"].findById(creator)];
            case 6:
                user = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                e_5 = _b.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Creating place failed, please try again", 500))];
            case 8:
                if (!user) {
                    return [2 /*return*/, next(new http_error_1["default"]("Creating not find user for provided user", 404))];
                }
                _b.label = 9;
            case 9:
                _b.trys.push([9, 15, , 16]);
                return [4 /*yield*/, mongoose_1["default"].startSession()];
            case 10:
                session = _b.sent();
                session.startTransaction();
                return [4 /*yield*/, createdPlace.save({ session: session })];
            case 11:
                _b.sent();
                return [4 /*yield*/, user.places.push(createdPlace.id)];
            case 12:
                _b.sent();
                return [4 /*yield*/, user.save({ session: session })];
            case 13:
                _b.sent();
                return [4 /*yield*/, session.commitTransaction()];
            case 14:
                _b.sent();
                return [3 /*break*/, 16];
            case 15:
                e_6 = _b.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Creating place failed, please try again", 500))];
            case 16:
                res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
                return [2 /*return*/];
        }
    });
}); };
exports.updatePlace = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, title, description, placeId, place, e_7, e_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = express_validator_1.validationResult(req);
                if (!error.isEmpty()) {
                    throw new http_error_1["default"]("Invalid inputs passed, please check your data.", 422);
                }
                _a = req.body, title = _a.title, description = _a.description;
                placeId = req.params.placeId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, place_1["default"].findById(placeId)];
            case 2:
                place = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_7 = _b.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Something went wrong, could not find place", 500))];
            case 4:
                if (place.creator.toString() !== req.userData.userId) {
                    return [2 /*return*/, next(new http_error_1["default"]("You are not allowed to edit this place.", 401))];
                }
                if (!place) return [3 /*break*/, 8];
                place.title = title;
                place.description = description;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, place.save()];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7:
                e_8 = _b.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Something went wrong, could not update place", 500))];
            case 8:
                res.json({ place: place.toObject({ getters: true }) });
                return [2 /*return*/];
        }
    });
}); };
exports.deletePlace = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var placeId, place, creatorData, imagePath, session, creator, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                placeId = req.params.placeId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, place_1["default"].findById(placeId).populate("creator")];
            case 2:
                place = _a.sent();
                if (!place) {
                    return [2 /*return*/, next(new http_error_1["default"]("Place doesn't exist", 404))];
                }
                creatorData = place.creator;
                if (creatorData.id !== req.userData.userId) {
                    return [2 /*return*/, next(new http_error_1["default"]("You are not allowed to edit this place.", 401))];
                }
                imagePath = place.imageUrl;
                return [4 /*yield*/, mongoose_1["default"].startSession()];
            case 3:
                session = _a.sent();
                session.startTransaction();
                return [4 /*yield*/, place.remove({ session: session })];
            case 4:
                _a.sent();
                creator = place.creator;
                return [4 /*yield*/, creator.places.pull(place)];
            case 5:
                _a.sent();
                return [4 /*yield*/, creator.save({ session: session })];
            case 6:
                _a.sent();
                return [4 /*yield*/, session.commitTransaction()];
            case 7:
                _a.sent();
                fs_1["default"].unlink(imagePath, function (err) { return console.log(err); });
                return [3 /*break*/, 9];
            case 8:
                e_9 = _a.sent();
                return [2 /*return*/, next(new http_error_1["default"]("Something went wrong, could not find place", 500))];
            case 9:
                res.json({ message: "Deleted place." });
                return [2 /*return*/];
        }
    });
}); };
