const UserService = require("../../business/services/user");

class UserController {
  constructor () {
    this.userService = new UserService();
  }  

  async insertUser (req, res, next) {
    try {
      const objectUser = {
        name : req.body.name,
        categoryUserCategoryId : req.body.categoryUserCategoryId
      }
      const resultConsultUser = await this.userService.insertUser(objectUser); 

      res.send(resultConsultUser);

      next();
    } catch (error) { next(error); }
  }

  async consultUser (req, res, next) {
    try {
      const resultConsultUser = await this.userService.consultUser(); 

      res.send(resultConsultUser);

      next();
    } catch (error) { next(error); }
  }
}

module.exports = UserController;
