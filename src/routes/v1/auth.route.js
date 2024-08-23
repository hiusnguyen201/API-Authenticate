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
  checkOtp,
} from "#src/http/controllers/auth.controller.js";
import {
  LOGIN_RULES,
  REGISTER_RULES,
  REFRESH_TOKEN_RULES,
  SEND_OTP_RULES,
  CHECK_OTP_RULES,
  RESET_PASSWORD_RULES,
} from "#src/http/rules/auth.rule.js";

router.route("/login").post(validateRequest(LOGIN_RULES), login);

router.route("/register").post(validateRequest(REGISTER_RULES), register);

router.route("/logout").post(validateRequest(REFRESH_TOKEN_RULES), logout);

router
  .route("/refresh-token")
  .post(validateRequest(REFRESH_TOKEN_RULES), refreshToken);

router
  .route("/send-otp-via-email")
  .post(validateRequest(SEND_OTP_RULES), sendOtpViaEmail);
router
  .route("/check-otp")
  .post(validateRequest(CHECK_OTP_RULES), checkOtp);
router
  .route("/reset-password")
  .post(validateRequest(RESET_PASSWORD_RULES), resetPassword);

export default router;
