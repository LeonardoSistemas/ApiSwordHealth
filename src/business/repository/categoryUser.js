const { BadRequest } = require("../../common/ExceptionHandler");
const db = require("../models")
const categoryUserColletion = db.categoryUser;

class UserRepository {
  constructor () {
    
  }

  async insertcategoryUser (objectCategoryUser) {
    
    categoryUserColletion.create(objectCategoryUser);
    return { rowAffect: 1 };

  }

  async consultcategoryUser () {
    
    const resultCategoryUser = categoryUserColletion.findAll();
    return resultCategoryUser;

  }
  
}

module.exports = UserRepository;
