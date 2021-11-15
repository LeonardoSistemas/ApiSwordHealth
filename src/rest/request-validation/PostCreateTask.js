const Joi = require("joi");

const postCreateTaskSchema = Joi.object({
  description: Joi.string().required().max(2500),
  userId: Joi.number().required()
});
module.exports = { postCreateTaskSchema };
