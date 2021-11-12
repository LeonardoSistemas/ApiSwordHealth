const { idSchema } = require("./idSchema");
const { postCreateRuleSchema } = require("./PostCreateRules");
const { putUpdateRuleSchema } = require("./PutUpdateRule");

const { bodyValidateRequest, paramValidateRequest } = require("../middlewares/ValidationMiddleware");

module.exports = {
  idSchema: (req, res, next) =>
    paramValidateRequest(req, res, next, idSchema),
  PostCreateRule: (req, res, next) =>
    bodyValidateRequest(req, res, next, postCreateRuleSchema),
  PutUpdateRule: (req, res, next) =>
    bodyValidateRequest(req, res, next, putUpdateRuleSchema)
};
