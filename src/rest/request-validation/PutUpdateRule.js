const Joi = require("joi");

const putUpdateRuleSchema = Joi.object({
  idRegra: Joi.number().required(),
  descricao: Joi.string().required(),
  idCredor: Joi.number().required(),
  idContrato: Joi.number().required(),
  idAcordo: Joi.number().required(),
  idParcela: Joi.number().required(),
  idVerba: Joi.number().required(),
  idStatusVerba: Joi.number().required(),
  apagado: Joi.number().required()
});
module.exports = { putUpdateRuleSchema };
