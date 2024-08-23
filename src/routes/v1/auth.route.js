import express from "express";
const router = express.Router();

import validateRequest from "#src/http/middlewares/validateRequest.js";
import {
  login,
  register,
  refreshToken,
  logout,
  sendOtpViaEmail,
  resetPassword,
  validateOtpResetPassword,
  login2Fa,
  verify2Fa,
} from "#src/http/controllers/auth.controller.js";
import {
  LOGIN_RULES,
  REGISTER_RULES,
  REFRESH_TOKEN_RULES,
  SEND_OTP_RULES,
  VALIDATE_OTP_RESET_PASS_RULES,
  RESET_PASSWORD_RULES,
  VERIFY_OTP_RULES,
} from "#src/http/rules/auth.rule.js";

router.route("/register").post(validateRequest(REGISTER_RULES), register);

router.route("/logout").post(validateRequest(REFRESH_TOKEN_RULES), logout);

router
  .route("/refresh-token")
  .post(validateRequest(REFRESH_TOKEN_RULES), refreshToken);

// Login
router.route("/login").post(validateRequest(LOGIN_RULES), login);

router.route("/2fa/login").post(validateRequest(LOGIN_RULES), login2Fa);
router
  .route("/2fa/verify")
  .post(validateRequest(VERIFY_OTP_RULES), verify2Fa);

// Send Otp
router
  .route("/send-otp-via-email")
  .post(validateRequest(SEND_OTP_RULES), sendOtpViaEmail);

// Reset Passowrd
router
  .route("/password-reset/validate")
  .post(
    validateRequest(VALIDATE_OTP_RESET_PASS_RULES),
    validateOtpResetPassword
  );
router
  .route("/password-reset/reset")
  .post(validateRequest(RESET_PASSWORD_RULES), resetPassword);

export default router;
