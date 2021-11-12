const Joi = require("joi");

const postCreateRuleSchema = Joi.object({
  descricao: Joi.string().required(),
  idCredor: Joi.number().required(),
  idContrato: Joi.number().required(),
  idAcordo: Joi.number().required(),
  idParcela: Joi.number().required(),
  idVerba: Joi.array().items(Joi.number()).required(),
  descVerba: Joi.string().required(),
  idStatusVerba: Joi.number().required(),
  verbaParcelada: Joi.number().required()
});
module.exports = { postCreateRuleSchema };
