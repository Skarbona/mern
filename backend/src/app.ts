import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { config } from "dotenv";

import placesRoutes from "./routes/places";
import usersRoutes from "./routes/users";

import errorHandler from "./middlewares/errorHandler";
import unHandledRoutes from "./middlewares/unHandledRoutes";

config();
const app = express();

app.use(bodyParser.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use(unHandledRoutes);
app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
    console.log("Server working + connected to database");
  })
  .catch(err => console.log(err));
