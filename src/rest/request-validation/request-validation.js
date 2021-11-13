const { idSchema } = require("./idSchema");
const { postCreateTaskSchema } = require("./PostCreateTask");
const { putUpdateTaskSchema } = require("./PutUpdateTask");

const { bodyValidateRequest, paramValidateRequest } = require("../middlewares/ValidationMiddleware");

module.exports = {
  idSchema: (req, res, next) =>
    paramValidateRequest(req, res, next, idSchema),
  PostCreateTask: (req, res, next) =>
    bodyValidateRequest(req, res, next, postCreateTaskSchema),
  PutUpdateTask: (req, res, next) =>
    bodyValidateRequest(req, res, next, putUpdateTaskSchema)
};
