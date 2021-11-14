const Joi = require("joi");

const putUpdateTaskSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().required().max(2500),
  complete: Joi.bool()
});
module.exports = { putUpdateTaskSchema };
