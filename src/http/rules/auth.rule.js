import Joi from "joi";

export const LOGIN_RULES = Joi.object({
  account: Joi.string().required(),
  password: Joi.string().required(),
});

export const REGISTER_RULES = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const REFRESH_TOKEN_RULES = Joi.object({
  refreshToken: Joi.string().required(),
});

export const REQUEST_PASSWORD_RESET_RULES = Joi.object({
  email: Joi.string().required().email(),
});

export const VALIDATE_PASSWORD_RESET_RULES = Joi.object({
  email: Joi.string().required().email(),
  otp: Joi.string().required(),
});

export const RESET_PASSWORD_RULES = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
