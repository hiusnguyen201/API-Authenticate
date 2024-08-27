import express from "express";
const router = express.Router();

import authRouter from "./auth.route.js";
import accountRouter from "./account.route.js";
import rolesRouter from "./roles.route.js";
import usersRouter from "./users.route.js";
import permissionsRouter from "./permissions.route.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";
import { hasPermission } from "#src/http/middlewares/hasPermission.js";

router.use("/auth", authRouter);
router.use("/account", isAuthorized, accountRouter);

router.use(hasPermission);
router.use("/roles", isAuthorized, rolesRouter);
router.use("/users", isAuthorized, usersRouter);
router.use("/permissions", isAuthorized, permissionsRouter);

export default router;
