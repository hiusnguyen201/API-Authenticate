import express from "express";
const router = express.Router();

import validateRequest from "#src/middlewares/validateRequest.js";

import {
  getAllPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "#src/controllers/permission.controller.js";

import {
  CREATE_PERMISSION_RULE,
  UPDATE_PERMISSION_RULE,
} from "#src/rules/permission.rule.js";

router
  .route("/")
  .get(getAllPermissions)
  .post(validateRequest(CREATE_PERMISSION_RULE), createPermission);

router
  .route("/:identify")
  .get(getPermission)
  .patch(validateRequest(UPDATE_PERMISSION_RULE), updatePermission)
  .delete(deletePermission);

export default router;
