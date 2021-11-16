const { BadRequest } = require("../../common/ExceptionHandler");
const UserRepository = require("../repository/user");

class UserService {
  constructor () {
    this.userRepository = new UserRepository();
  }  

  async insertUser (objectUser) {
    const resultConsultUser = await this.userRepository.insertUser(objectUser);
    return resultConsultUser;
  }

  async consultUser () {
    const resultConsultUser = await this.userRepository.consultUser();
    return resultConsultUser;
  }

  async consultUserById(userId) {
    const resultConsultUser = await this.userRepository.consultUserById(userId);
    return resultConsultUser;
  }
}

module.exports = UserService;
