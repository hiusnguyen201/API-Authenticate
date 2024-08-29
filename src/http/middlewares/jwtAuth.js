import responseCode from "#src/constants/responseCode.constant.js";
import userService from "#src/http/services/user.service.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";

function authorized() {
  return [
    // Authenticate JWT token and attach user to req.user
    JwtUtils.jwtMiddleware,
    async (req, _, next) => {
      const user = await userService.getOne(req.user._id, "_id roles");

      if (!user) {
        return next(
          ApiErrorUtils.simple(responseCode.USER.USER_NOT_FOUND)
        );
      }

      req.roles = user.roles;
      next();
    },
  ];
}

export const isAuthorized = authorized();
