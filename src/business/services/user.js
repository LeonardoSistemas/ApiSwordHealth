const { BadRequest } = require("../../common/ExceptionHandler");
const UserRepository = require("../repository/user");

class UserService {
  constructor () {
    this.userRepository = new UserRepository();
  }  

  async consultUser () {
    const resultConsultUser = await this.userRepository.consultUser();
    return resultConsultUser;
  }
}

module.exports = UserService;
