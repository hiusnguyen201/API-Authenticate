import httpStatus from "http-status";

const responseCode = {
  AUTH: {
    USER_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "User not found",
    },
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
  BOARD: {
    BOARD_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "Board not found",
    },
  },
  LIST: {
    LIST_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "List not found",
    },
  },
  CARD: {
    CARD_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: "Card not found",
    },
  },
};

export default responseCode;
