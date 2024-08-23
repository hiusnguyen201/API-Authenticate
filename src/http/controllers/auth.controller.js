import userService from "#src/services/user.service.js";
import authService from "#src/services/auth.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";
import FormatUtils from "#src/utils/FormatUtils.js";

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    if (!newUser || !newUser._doc) {
      throw new Error("Register failed !");
    }

    ResponseUtils.status201(res, "Register successfully !", {
      accessToken: JwtUtils.generateToken({ _id: newUser._id }),
      user: FormatUtils.formatOneUser(newUser),
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const ipAddress = req.ipv4;

    const data = await authService.authenticate(account, password, ipAddress);

    if (!data.user || !data.accessToken || !data.refreshToken) {
      throw new Error("Authenticate failed !");
    }

    ResponseUtils.status200(res, "Login successfully !", {
      user: FormatUtils.formatOneUser(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const status = await authService.revokeToken(refreshToken);

    if (!status) {
      throw new Error("Logout failed !");
    }

    ResponseUtils.status204(res, "Logout successfully !");
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const ipAddress = req.ipv4;
    const refreshToken = req.body.refreshToken;
    const data = await authService.refreshToken(refreshToken, ipAddress);

    if (!data.user || !data.accessToken || !data.refreshToken) {
      throw new Error("Refresh token failed !");
    }

    ResponseUtils.status200(res, "Refresh token successfully !", {
      user: FormatUtils.formatOneUser(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const requestPasswordReset = async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await authService.sendOtpViaMail(email);

    if (!result) {
      throw new Error("Request password reset failed !");
    }

    ResponseUtils.status200(res, "Send otp code successfully !");
  } catch (err) {
    next(err);
  }
};

export const validatePasswordReset = async (req, res, next) => {
  try {
    const { email, otp } = req.body.email;
    const token = await authService.validateOtpReset(email, otp);

    if (!token) {
      throw new Error("Validate otp failed !");
    }

    ResponseUtils.status200(res, "Validate otp successfully !", { token });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body.password;
    const status = await authService.resetPassword(token, password);

    if (!status) {
      throw new Error("Reset password failed !");
    }

    ResponseUtils.status204(res, "Reset password successfully !");
  } catch (err) {
    next(err);
  }
};
