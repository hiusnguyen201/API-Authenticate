import express from "express";
const router = express.Router();

import authRouter from "./auth.route.js";
import accountRouter from "./account.route.js";
import rolesRouter from "./roles.route.js";
import usersRouter from "./users.route.js";
import permissionsRouter from "./permissions.route.js";
import { isAuthorized } from "#src/middlewares/jwtAuth.js";
import { hasPermission } from "#src/middlewares/hasPermission.js";

router.use("/auth", authRouter);
router.use("/account", isAuthorized, accountRouter);

router.use("/roles", isAuthorized, hasPermission, rolesRouter);
router.use("/users", isAuthorized, hasPermission, usersRouter);
router.use("/permissions", isAuthorized, hasPermission, permissionsRouter);

export default router;
