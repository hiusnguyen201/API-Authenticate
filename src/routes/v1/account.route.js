import express from "express";

import { getInfo } from "#src/controllers/account.controller.js";

const router = express.Router();

router.route("/info").get(getInfo);

export default router;
