import express from "express";
const router = express.Router();

import validateRequest from "#src/http/middlewares/validateRequest.js";
import {
  login,
  register,
  refreshToken,
  logout,
  requestPasswordReset,
  validatePasswordReset,
  resetPassword,
} from "#src/http/controllers/auth.controller.js";
import {
  LOGIN_RULES,
  REGISTER_RULES,
  REFRESH_TOKEN_RULES,
  REQUEST_PASSWORD_RESET_RULES,
  VALIDATE_PASSWORD_RESET_RULES,
  RESET_PASSWORD_RULES,
} from "#src/http/rules/auth.rule.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.route("/login").post(validateRequest(LOGIN_RULES), login);

router.route("/register").post(validateRequest(REGISTER_RULES), register);

router
  .route("/logout")
  .post(isAuthorized, validateRequest(REFRESH_TOKEN_RULES), logout);

router
  .route("/refresh-token")
  .post(validateRequest(REFRESH_TOKEN_RULES), refreshToken);

router
  .route("/password-reset/request")
  .post(
    validateRequest(REQUEST_PASSWORD_RESET_RULES),
    requestPasswordReset
  );
router
  .route("/password-reset/validate")
  .post(
    validateRequest(VALIDATE_PASSWORD_RESET_RULES),
    validatePasswordReset
  );

router
  .route("/password-reset/reset")
  .patch(validateRequest(RESET_PASSWORD_RULES), resetPassword);

export default router;
