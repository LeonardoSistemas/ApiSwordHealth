const { Router } = require("express");
const routes = Router();

const TaskController = require("../controllers/task");
const taskController = new TaskController();

routes.get("/task", (req, res, next) => {
    taskController.consultTask(req, res, next);
});

module.exports = routes;
