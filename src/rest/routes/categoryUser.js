const { Router } = require("express");
const routes = Router();

const UserController = require("../controllers/categoryUser");
const userController = new UserController();

routes.post("/categoryUser", (req, res, next) => {
  userController.insertcategoryUser(req, res, next);
});

routes.get("/categoryUser", (req, res, next) => {
    userController.consultcategoryUser(req, res, next);
  });

module.exports = routes;
