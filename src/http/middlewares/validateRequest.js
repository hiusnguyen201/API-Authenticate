import ResponseUtils from "#src/utils/ResponseUtils.js";

const options = {
  abortEarly: false, // when true, stops validation on the first error, otherwise returns all the errors found. Defaults to true.
  allowUnknown: true, //  when true, allows object to contain unknown keys which are ignored. Defaults to false.
  stripUnknown: true, //  when true, ignores unknown keys with a function value. Defaults to false.
};

function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errors = error.details.map((item) => {
        return {
          field: item.path[0],
          message: item.message,
        };
      });

      ResponseUtils.status400(res, "Validation error !", null, errors);
    } else {
      req.body = value;
      next();
    }
  };
}

export default validateRequest;
