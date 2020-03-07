"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var mongoose_1 = __importStar(require("mongoose"));
var placeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    address: { type: String, required: true },
    creator: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    location: {
        lng: { type: Number, required: true },
        lat: { type: Number, required: true }
    }
});
var placeModel = mongoose_1["default"].model("Place", placeSchema);
exports["default"] = placeModel;
