import Joi from "joi";

export const CREATE_ROLE_RULE = Joi.object({
  name: Joi.string().required(),
});

export const UPDATE_ROLE_RULE = Joi.object({
  name: Joi.string().required(),
});

export const UPDATE_PERMISSIONS_RULE = Joi.object({
  permissions: Joi.array().required(),
});
