const { Router } = require("express");
const routes = Router();

const TaskController = require("../controllers/task");
const taskController = new TaskController();

const {    
    PostCreateTask
    , PutUpdateTask
    , PutCompleteTask
    , DeleteTask
  } = require("../request-validation/request-validation");

routes.get("/task/:userId", (req, res, next) => {
    taskController.consultTask(req, res, next);
});

routes.post("/task", PostCreateTask, (req, res, next) => {
    taskController.insertTask(req, res, next);
});

routes.put("/task/:id", PutUpdateTask, (req, res, next) => {
    taskController.updateTask(req, res, next);
});

routes.put("/task/complete/:id", PutCompleteTask, (req, res, next) => {
    taskController.completeTask(req, res, next);
});

routes.delete("/task/:id", DeleteTask, (req, res, next) => {
    taskController.deleteTask(req, res, next);
});


module.exports = routes;
