"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = require("dotenv");
var places_1 = __importDefault(require("./routes/places"));
var users_1 = __importDefault(require("./routes/users"));
var errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
var unHandledRoutes_1 = __importDefault(require("./middlewares/unHandledRoutes"));
var cors_1 = __importDefault(require("./middlewares/cors"));
dotenv_1.config();
var app = express_1["default"]();
app.use(body_parser_1["default"].json());
app.use('/uploads/images', express_1["default"].static(path_1["default"].join('uploads', 'images')));
app.use(cors_1["default"]);
app.use("/api/places", places_1["default"]);
app.use("/api/users", users_1["default"]);
app.use(unHandledRoutes_1["default"]);
app.use(errorHandler_1["default"]);
mongoose_1["default"]
    .connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    app.listen(process.env.PORT || 5000);
    console.log("Server working + connected to database");
})["catch"](function (err) { return console.log(err); });
