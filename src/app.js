import express from "express";
import mongoose from "mongoose";
import path from "path";
// import logger from "morgan";
import cors from "cors";

import config from "./config.js";
import logger from "#src/middlewares/logger.js";
import error from "#src/middlewares/error.js";
import limiter from "#src/middlewares/rateLimit.js";
import routerV1 from "#src/routes/v1/index.route.js";
import LogUtils from "#src/utils/LogUtils.js";
import moment from "moment-timezone";
moment.tz("Asia/Ho_Chi_Minh").format();

// var createError = require("http-errors");
// var cookieParser = require("cookie-parser");

const app = express();

// Cors
app.use(cors());

app.use((req, _, next) => {
  req.ipv4 = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  next();
});

// view engine setup
app.set("views", path.join(config.dirname, "src/views"));
app.set("view engine", "ejs");

app.use(logger);
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(config.dirname, "/public")));

// Docs
app.use("/docs", (req, res) => {
  return res.render("docs");
});

// Rate limit
app.use(limiter);

// Api version 1
app.use("/api/v1", routerV1);

// Converts errors to ApiErrorUtils
app.use(error.converter);

// Catch 404 and forward to error handler
app.use(error.notFound);

// Error handler and send stacktrace during development
app.use(error.handler);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    LogUtils.info("DATABASE", "Connected successfully to MongoDB");
  })
  .catch((err) => {
    LogUtils.error("DATABASE", "Connect to MongoDB failed", err);
  });

export default app;
