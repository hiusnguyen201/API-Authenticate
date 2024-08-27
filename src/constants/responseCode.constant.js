import httpStatus from "http-status";

const responseCode = {
  AUTH: {
    INVALID_PASSWORD: {
      status: httpStatus.UNAUTHORIZED,
      message: "Invalid account or password",
    },
    INVALID_TOKEN: {
      status: httpStatus.UNAUTHORIZED,
      message: "Invalid token",
    },
    REVOKE_TOKEN_FROM_UNAUTHORIZED_IP: {
      status: httpStatus.UNAUTHORIZED,
      message: "Can't refresh token from other ip address",
    },
    BEARER_TOKEN_IS_EMPTY: {
      status: httpStatus.UNAUTHORIZED,
      message: "No token provided",
    },
    INVALID_FORMAT_BEARER_TOKEN: {
      status: httpStatus.BAD_REQUEST,
      message:
        "Invalid token format. Format is Authorization: Bearer [token]",
    },
    EXIST_USERNAME: {
      status: httpStatus.BAD_REQUEST,
      message: "Username already exist",
    },
    EXIST_EMAIL: {
      status: httpStatus.BAD_REQUEST,
      message: "Email already exist",
    },
    INVALID_OTP: {
      status: httpStatus.UNAUTHORIZED,
      message: "Invalid otp",
    },
  },
  ROLE: {
    EXIST_ROLE: {
      status: httpStatus.BAD_REQUEST,
      message: "Role already exist",
    },
    ROLE_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "Role not found",
    },
    ROLE_HAS_USERS: {
      status: httpStatus.BAD_REQUEST,
      message: "Can not delete role because it has users",
    },
  },
  USER: {
    USER_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "User not found",
    },
  },
  PERMISSION: {
    EXIST_PERMISSION: {
      status: httpStatus.BAD_REQUEST,
      message: "Permission already exist",
    },
    PERMISSION_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "Permission not found",
    },
    PERMISSION_HAS_ROLES: {
      status: httpStatus.BAD_REQUEST,
      message: "Can not delete permission because it has roles",
    },
  },
};

export default responseCode;
