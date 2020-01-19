import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places";
import usersRoutes from "./routes/users";

import errorHandler from "./middlewares/errorHandler";

const app = express();

// app.use(bodyParser);
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

app.listen(5000);
