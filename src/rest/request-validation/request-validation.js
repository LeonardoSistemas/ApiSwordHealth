const { idSchema } = require("./idSchema");
const { postCreateTaskSchema } = require("./PostCreateTask");
const { putUpdateTaskSchema } = require("./PutUpdateTask");
const { putCompleteTaskSchema } = require("./PutCompleteTask");
const { deleteTaskSchema } = require("./DeleteTask");

const { bodyValidateRequest, paramValidateRequest } = require("../middlewares/ValidationMiddleware");

module.exports = {
  idSchema: (req, res, next) =>
    paramValidateRequest(req, res, next, idSchema),
  PostCreateTask: (req, res, next) =>
    bodyValidateRequest(req, res, next, postCreateTaskSchema),
  PutUpdateTask: (req, res, next) =>
    bodyValidateRequest(req, res, next, putUpdateTaskSchema),
  PutCompleteTask: (req, res, next) =>
    bodyValidateRequest(req, res, next, putCompleteTaskSchema),
  DeleteTask: (req, res, next) =>
    bodyValidateRequest(req, res, next, deleteTaskSchema)
};
