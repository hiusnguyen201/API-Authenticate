import jwt from "jsonwebtoken";
import ApiErrorUtils from "./ApiErrorUtils.js";
import responseCode from "#src/constants/responseCode.constant.js";
import StringUtils from "#src/utils/StringUtils.js";

class JwtUtils {
  static generateToken(payload, expiresIn = "7d") {
    return jwt.sign(payload, process.env.SECRET_JWT_TOKEN, {
      expiresIn,
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_JWT_TOKEN);
    } catch (err) {
      throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_TOKEN);
    }
  }

  static async jwtMiddleware(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

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

    const decoded = JwtUtils.verifyToken(token);

    if (!decoded) {
      return next(ApiErrorUtils.simple(responseCode.AUTH.INVALID_TOKEN));
    }
    req.user = decoded;
    next();
  }
}

export default JwtUtils;
