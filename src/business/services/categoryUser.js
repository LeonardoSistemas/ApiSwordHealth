const { BadRequest } = require("../../common/ExceptionHandler");
const CategoryUserRepository = require("../repository/categoryUser");

class UserService {
  constructor () {
    this.categoryUserRepository = new CategoryUserRepository();
  }  

  async insertcategoryUser (objectCategoryUser) {
    const resultConsultUser = await this.categoryUserRepository.insertcategoryUser(objectCategoryUser);
    return resultConsultUser;
  }

  async consultcategoryUser () {
    const resultConsultUser = await this.categoryUserRepository.consultcategoryUser();
    return resultConsultUser;
  }

}

module.exports = UserService;
