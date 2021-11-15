const { BadRequest } = require("../../common/ExceptionHandler");
const db = require("../models")
const userColletion = db.user;
const categoryColletion = db.categoryUser;

class UserRepository {
  constructor () {
    
  }

  async consultUser () {
    
   categoryColletion.findAll({  
      attributes:['description', 'permissionToViewTask'],    
      include:[{
        model: userColletion,
        attributes:['name']
      }]
    }).then(user => console.table(user))

  }
}

module.exports = UserRepository;
