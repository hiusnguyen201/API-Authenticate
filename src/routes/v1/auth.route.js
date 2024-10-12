import express from "express";
const router = express.Router();

import {
  validateSchema,
  validateFile,
} from "#src/middlewares/validateRequest.js";
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
  googleOAuth,
} from "#src/controllers/auth.controller.js";
import {
  LOGIN_RULES,
  REGISTER_RULES,
  REFRESH_TOKEN_RULES,
  SEND_OTP_RULES,
  VALIDATE_OTP_RESET_PASS_RULES,
  RESET_PASSWORD_RULES,
  VERIFY_OTP_RULES,
} from "#src/rules/auth.rule.js";
import UploadUtils from "#src/utils/UploadUtils.js";
import { allowImageMimeTypes } from "#src/constants/common.constant.js";

const upload = UploadUtils.config("/users/", allowImageMimeTypes);

// Register
router
  .route("/register")
  .post(
    validateFile(upload.single("avatar"), "avatar", true),
    validateSchema(REGISTER_RULES),
    register
  );

// Logout
router.route("/logout").post(validateSchema(REFRESH_TOKEN_RULES), logout);

// Refresh token
router
  .route("/refresh-token")
  .post(validateSchema(REFRESH_TOKEN_RULES), refreshToken);

// Login
router.route("/login").post(validateSchema(LOGIN_RULES), login);

// Google
router.route("/google").post(googleOAuth);

router.route("/2fa/login").post(validateSchema(LOGIN_RULES), login2Fa);
router
  .route("/2fa/verify")
  .post(validateSchema(VERIFY_OTP_RULES), verify2Fa);

// Send Otp
router
  .route("/send-otp-via-email")
  .post(validateSchema(SEND_OTP_RULES), sendOtpViaEmail);

// Reset Passowrd
router
  .route("/password-reset/validate")
  .post(
    validateSchema(VALIDATE_OTP_RESET_PASS_RULES),
    validateOtpResetPassword
  );
router
  .route("/password-reset/reset")
  .post(validateSchema(RESET_PASSWORD_RULES), resetPassword);

export default router;
