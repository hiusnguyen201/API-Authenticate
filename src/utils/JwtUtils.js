import jwt from "jsonwebtoken";
import ApiErrorUtils from "./ApiErrorUtils.js";
import responseCode from "#src/constants/responseCode.constant.js";
import StringUtils from "#src/utils/StringUtils.js";
import config from "#src/config.js";

class JwtUtils {
  static generateToken(payload, expiresIn = config.jwtExpiresIn) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
  }

  static async jwtMiddleware(req, res, next) {
    let token =
      req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
      return next(
        ApiErrorUtils.simple(responseCode.AUTH.BEARER_TOKEN_IS_EMPTY)
      );
    }

    if (StringUtils.isBearerToken(token)) {
      token = token.split(" ")[1];
    } else {
      return next(
        ApiErrorUtils.simple(responseCode.AUTH.INVALID_FORMAT_BEARER_TOKEN)
      );
    }

    try {
      const decoded = JwtUtils.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      return next(ApiErrorUtils.simple(responseCode.AUTH.INVALID_TOKEN));
    }
  }
}

export default JwtUtils;
