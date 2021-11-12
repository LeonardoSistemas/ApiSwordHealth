const { BadRequest } = require("../../common/ExceptionHandler");

exports.bodyValidateRequest = function (req, res, next, schema) {
  const valueTovalid = req.body;

  const { error } = schema.validate(valueTovalid);
  if (error) {
    next(new BadRequest(`Validation error: ${error.details.map(x => x.message).join(", ")}`));
  } else {
    next();
  }
};

exports.paramValidateRequest = function (req, res, next, schema) {
  const valueTovalid = req.params;

  const { error } = schema.validate(valueTovalid);
  if (error) {
    next(new BadRequest(`Validation error: ${error.details.map(x => x.message).join(", ")}`));
  } else {
    next();
  }
};
