const Joi = require("joi");

const putUpdateTaskSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().required().max(2500)
});
module.exports = { putUpdateTaskSchema };
