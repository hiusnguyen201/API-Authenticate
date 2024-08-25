import RefreshToken from "#src/models/refreshToken.model.js";
import mailerService from "./mailer.service.js";
import otpService from "./otp.service.js";
import userService from "./user.service.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";
import CryptoUtils from "#src/utils/CryptoUtils.js";

export default {
  authenticate,
  authenticateWith2Fa,
  revokeToken,
  refreshToken,
  sendOtpViaMail,
  checkOtp,
  resetPassword,
  verifyOtpWith2FA,
  googleAuthenticate,
};

async function googleAuthenticate(payload, ipAddress) {
  const { sub: googleId, email, name } = payload;

  const user = await userService.getOrCreateByGoogleId(
    googleId,
    email,
    name
  );

  if (!user) {
    throw ApiErrorUtils.simple2(responseCode.AUTH.USER_NOT_FOUND);
  }

  const accessToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = await generateRefreshToken(user._id, ipAddress);

  return {
    user,
    accessToken,
    refreshToken: refreshToken.token,
  };
}

/**
 * Authenticate
 * @param {*} username
 * @param {*} password
 * @param {*} ipAddress
 * @returns
 */
async function authenticate(account, password, ipAddress) {
  const user = await userService.getOne(account, "_id name password");

  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_PASSWORD);
  }

  const isMatch = BcryptUtils.compareHash(password, user.password);
  if (!isMatch) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_PASSWORD);
  }

  const accessToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = await generateRefreshToken(user._id, ipAddress);

  return {
    user,
    accessToken,
    refreshToken: refreshToken.token,
  };
}

/**
 * Authenticate with 2fa
 * @param {*} username
 * @param {*} password
 * @param {*} ipAddress
 * @returns
 */
async function authenticateWith2Fa(account, password) {
  const user = await userService.getOne(account, "_id name password");

  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_PASSWORD);
  }

  const isMatch = BcryptUtils.compareHash(password, user.password);
  if (!isMatch) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_PASSWORD);
  }

  return user;
}

/**
 * Verify otp with 2fa
 * @param {*} identify
 * @param {*} password
 * @param {*} ipAddress
 * @returns
 */
async function verifyOtpWith2FA(identify, otp, ipAddress) {
  const user = await userService.getOne(identify);
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const result = await otpService.validateOtp(user._id, otp);
  if (!result) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_OTP);
  }

  const accessToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = await generateRefreshToken(user._id, ipAddress);

  return {
    user,
    accessToken,
    refreshToken: refreshToken.token,
  };
}

/**
 * Generate refresh token
 * @param {*} userId
 * @param {*} ipAddress
 * @returns
 */
async function generateRefreshToken(userId, ipAddress) {
  const refreshToken = await RefreshToken.create({
    user: userId,
    token: CryptoUtils.randomCrypto(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
  return refreshToken;
}

/**
 * Refresh token
 * @param {*} token
 * @param {*} ipAddress
 * @returns
 */
async function refreshToken(token, ipAddress) {
  const currentRefreshToken = await getRefreshToken(token);
  if (currentRefreshToken.createdByIp !== ipAddress) {
    throw ApiErrorUtils.simple(
      responseCode.AUTH.REVOKE_TOKEN_FROM_UNAUTHORIZED_IP
    );
  }

  const { user } = currentRefreshToken;

  const newRefreshToken = await generateRefreshToken(user._id, ipAddress);
  currentRefreshToken.revokedAt = Date.now();
  currentRefreshToken.revokedByIp = ipAddress;
  currentRefreshToken.replacedByToken = newRefreshToken.token;
  await currentRefreshToken.save();
  await newRefreshToken.save();

  const accessToken = JwtUtils.generateToken({ _id: user._id });

  return {
    user,
    accessToken,
    refreshToken: newRefreshToken.token,
  };
}

/**
 * Revoke token
 * @param {*} token
 * @param {*} ipAddress
 * @returns
 */
async function revokeToken(token, ipAddress) {
  const refreshToken = await getRefreshToken(token);
  refreshToken.revokedAt = Date.now();
  refreshToken.revokedByIp = ipAddress;
  const status = await refreshToken.save();
  return !!status;
}

/**
 * Get refreshToken
 * @param {*} token
 * @returns
 */
async function getRefreshToken(token) {
  const refreshToken = await RefreshToken.findOne({
    token,
  })
    .populate({
      path: "user",
      select: userService.SELECTED_FIELDS,
    })
    .sort({
      createdAt: "desc",
    });

  if (!refreshToken || !refreshToken.isActive) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_TOKEN);
  }

  return refreshToken;
}

/**
 * Send otp to mail
 * @param {*} email
 * @returns
 */
async function sendOtpViaMail(email) {
  const user = await userService.getOne(email);
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const otpCode = await otpService.createOtp(user._id);

  return await mailerService.sendWithOtpTemplate(email, otpCode);
}

/**
 * Check otp to reset password
 * @param {*} email
 * @returns
 */
async function checkOtp(email, otp) {
  const user = await userService.getOne(email, "_id");
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const isValidOtp = await otpService.validateOtp(user._id, otp);

  if (!isValidOtp) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_OTP);
  }
  const otpToken = JwtUtils.generateToken({ email }, "15m");
  return otpToken;
}

/**
 * Reset password
 * @param {*} token
 * @param {*} password
 * @returns
 */
async function resetPassword(email, token, password) {
  let isValidOtp = false;
  try {
    isValidOtp = JwtUtils.verifyToken(token).email === email;
  } catch (err) {
    isValidOtp = false;
  }

  if (!isValidOtp) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_OTP);
  }

  const user = await userService.getOne(email, "_id");
  const hash = BcryptUtils.makeHash(password);
  const result = await userService.updateById(user._id, {
    password: hash,
  });
  return result;
}
