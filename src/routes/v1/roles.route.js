import express from "express";
const router = express.Router();

import {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "#src/http/controllers/role.controller.js";

router.route("/").get(getAllRoles).post(createRole);

router
  .route("/:identify")
  .get(getRole)
  .patch(updateRole)
  .delete(deleteRole);

export default router;
