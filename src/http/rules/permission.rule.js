import Joi from "joi";
import regexPattern from "#src/constants/regexPattern.constant.js";

export const CREATE_PERMISSION_RULE = Joi.object({
  value: Joi.string()
    .required()
    .pattern(regexPattern.VALUE_PERMISSION)
    .messages({
      "string.pattern.base":
        "Value must be in the format: 'module'.create, 'module'.read, 'module'.update, 'module'.delete",
    }),
});

export const UPDATE_PERMISSION_RULE = Joi.object({
  value: Joi.string()
    .required()
    .pattern(regexPattern.VALUE_PERMISSION)
    .messages({
      "string.pattern.base":
        "Value must be in the format: 'module'.create, 'module'.read, 'module'.update, 'module'.delete",
    }),
});
