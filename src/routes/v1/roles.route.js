import express from "express";
const router = express.Router();

import validateRequest from "#src/middlewares/validateRequest.js";

import {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  updateRolePermissions,
} from "#src/controllers/role.controller.js";

import {
  CREATE_ROLE_RULE,
  UPDATE_ROLE_RULE,
  UPDATE_PERMISSIONS_RULE,
} from "#src/rules/role.rule.js";

router
  .route("/")
  .get(getAllRoles)
  .post(validateRequest(CREATE_ROLE_RULE), createRole);

router
  .route("/:identify")
  .get(getRole)
  .patch(validateRequest(UPDATE_ROLE_RULE), updateRole)
  .delete(deleteRole);

router
  .route("/:identify/permissions")
  .patch(validateRequest(UPDATE_PERMISSIONS_RULE), updateRolePermissions);

export default router;
