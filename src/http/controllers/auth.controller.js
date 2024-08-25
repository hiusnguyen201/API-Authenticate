import userService from "#src/services/user.service.js";
import authService from "#src/services/auth.service.js";
import googleService from "#src/services/google.service.js";
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

export const googleOAuth = async (req, res, next) => {
  try {
    const { googleCredential, clientId } = req.body;
    const ipAddress = req.ipv4;

    const payload = await googleService.verify(googleCredential, clientId);
    if (!payload) {
      throw new Error("Google OAuth failed !");
    }

    const data = await authService.googleAuthenticate(payload, ipAddress);

    ResponseUtils.status200(res, "Google OAuth successful !", {
      user: FormatUtils.formatOneUser(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const ipAddress = req.ipv4;

    const data = await authService.authenticate(
      account,
      password,
      ipAddress
    );

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

export const login2Fa = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const user = await authService.authenticateWith2Fa(account, password);
    if (!user) {
      throw new Error("Authenticate failed !");
    }

    ResponseUtils.status200(res, "Authenticate successfully !", {
      user: FormatUtils.formatOneUser(user),
    });
  } catch (err) {
    next(err);
  }
};

export const verify2Fa = async (req, res, next) => {
  try {
    const { account, otp } = req.body;
    const ipAddress = req.ipv4;
    const data = await authService.verifyOtpWith2FA(
      account,
      otp,
      ipAddress
    );

    if (!data.user || !data.accessToken || !data.refreshToken) {
      throw new Error("Verify otp failed !");
    }

    ResponseUtils.status200(res, "Verify otp successful !", {
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

    ResponseUtils.status204(res);
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

export const sendOtpViaEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await authService.sendOtpViaMail(email);

    if (!result) {
      throw new Error("Create or send otp failed");
    }

    ResponseUtils.status200(res, "Send otp code successfully !");
  } catch (err) {
    next(err);
  }
};

export const validateOtpResetPassword = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const token = await authService.checkOtp(email, otp);

    if (!token) {
      throw new Error("Otp is invalid !");
    }

    ResponseUtils.status200(res, "Otp is valid !", { token });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token = "", password = "", email = "" } = req.body;
    const status = await authService.resetPassword(email, token, password);

    if (!status) {
      throw new Error("Reset password failed !");
    }

    ResponseUtils.status204(res);
  } catch (err) {
    next(err);
  }
};
