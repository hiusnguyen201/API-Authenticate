import express from "express";
const router = express.Router();

import authRouter from "./auth.route.js";
import accountRouter from "./account.route.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.use("/auth", authRouter);
router.use("/account", isAuthorized, accountRouter);

export default router;
