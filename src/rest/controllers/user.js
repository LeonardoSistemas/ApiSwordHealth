const UserService = require("../../business/services/user");

class UserController {
  constructor () {
    this.userService = new UserService();
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
