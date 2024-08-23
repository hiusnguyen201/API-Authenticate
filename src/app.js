import express from "express";
import mongoose from "mongoose";
import path from "path";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

import error from "#src/http/middlewares/error.js";
import routerV1 from "#src/routes/v1/index.route.js";

// var createError = require("http-errors");
// var cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const __dirname = process.cwd();
app.use(cors());

app.use((req, res, next) => {
  req.ipv4 = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// Docs
app.use("/docs", (req, res) => {
  return res.render("docs");
});

// Api version 1
app.use("/api/v1", routerV1);

// Converts errors to ApiErrorUtils
app.use(error.converter);

// Catch 404 and forward to error handler
app.use(error.notFound);

// Error handler and send stacktrace during development
app.use(error.handler);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected successfully to MongoDB !");
  })
  .catch((err) => {
    console.log("Connect to MongoDB failed !");
    console.log(err);
  });

export default app;
