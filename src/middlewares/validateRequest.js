import ResponseUtils from "#src/utils/ResponseUtils.js";
import UploadUtils from "#src/utils/UploadUtils.js";

const options = {
  abortEarly: false, // when true, stops validation on the first error, otherwise returns all the errors found. Defaults to true.
  allowUnknown: true, //  when true, allows object to contain unknown keys which are ignored. Defaults to false.
  stripUnknown: true, //  when true, ignores unknown keys with a function value. Defaults to false.
};

export { validateSchema, validateFile };

function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      // Clear upload file
      UploadUtils.clearUploadFile(req.body.files);

      const errors = error.details.map((item) => {
        return {
          field: item.path[0],
          message: item.message,
        };
      });

      if (req?.errUpload) {
        errors.push(req.errUpload);
        delete req.errUpload;
      }

      return ResponseUtils.status400(res, "Validation error", errors);
    }

    req.body = { files: req.body.files, ...value };
    next();
  };
}

function validateFile(multerUpload, field, validateChain = false) {
  return (req, res, next) => {
    multerUpload(req, res, (err) => {
      if (!err) {
        UploadUtils.handleFilePath(req, field);
        return next();
      }

      const error = { field, message: err.message };
      if (validateChain) {
        req.errUpload = error;
        return next();
      }

      return ResponseUtils.status400(res, "Validation error", [error]);
    });
  };
}
