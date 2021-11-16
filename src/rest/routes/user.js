const { Router } = require("express");
const routes = Router();

const UserController = require("../controllers/user");
const userController = new UserController();

routes.post("/user", (req, res, next) => {
  userController.insertUser(req, res, next);
});

routes.get("/user", (req, res, next) => {
  userController.consultUser(req, res, next);
});

module.exports = routes;
