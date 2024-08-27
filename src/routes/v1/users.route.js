import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserRoles,
} from "#src/http/controllers/user.controller.js";

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:identify")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/:identify/roles").patch(updateUserRoles);

export default router;
