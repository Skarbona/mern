const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// app.use(bodyParser);
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

app.listen(5000);
