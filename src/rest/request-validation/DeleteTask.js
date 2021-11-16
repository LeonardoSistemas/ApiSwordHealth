const Joi = require("joi");

const deleteTaskSchema = Joi.object({
  userId: Joi.number().required()
});
module.exports = { deleteTaskSchema };
