import Joi from "joi";
import { regexPattern } from "#src/constants/common.constant.js";

export const CREATE_USER_RULE = Joi.object({
  name: Joi.string().required(),
  username: Joi.string(),
  phone: Joi.string().pattern(regexPattern.PHONE).message({
    "string.pattern.base": "Phone is not right format",
  }),
  email: Joi.string().required().email(),
});

export const UPDATE_USER_RULE = Joi.object({
  name: Joi.string().required(),
  username: Joi.string(),
  phone: Joi.string().pattern(regexPattern.PHONE).message({
    "string.pattern.base": "Phone is not right format",
  }),
  email: Joi.string().required().email(),
});

export const UPDATE_ROLES_RULE = Joi.object({
  roles: Joi.array().required(),
});
