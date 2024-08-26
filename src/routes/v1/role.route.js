import express from "express";
const router = express.Router();

import {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  hiddenRole,
} from "#src/http/controllers/role.controller.js";

router.route("/").get(getAllRoles).post(createRole);

router
  .route("/:identify")
  .get(getRole)
  .patch(updateRole)
  .delete(deleteRole);

router.route("/:identify/hidden").patch(hiddenRole);

export default router;
