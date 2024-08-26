import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "#src/http/controllers/user.controller.js";

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:identify")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
