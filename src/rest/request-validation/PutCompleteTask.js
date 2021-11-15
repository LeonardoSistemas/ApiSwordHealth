const Joi = require("joi");

const putCompleteTaskSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().required().max(2500),
  complete: Joi.boolean().required(),
  completiondate: Joi.date().required()
});
module.exports = { putCompleteTaskSchema };
