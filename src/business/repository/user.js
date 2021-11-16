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

  async consultUserById (userId) {
    
    return categoryColletion.findAll({  
       attributes:['description', 'permissionToViewTask'],    
       include:[{
         model: userColletion,
         attributes:['name'],
         where : {id : userId}
       }]
     }).then((user) => {
       
       return user.map((r) => {
         return r.dataValues;
       });
     })
 
   }
}

module.exports = UserRepository;
