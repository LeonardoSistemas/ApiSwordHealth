const { BadRequest } = require("../../common/ExceptionHandler");
const db = require("../models")
const userColletion = db.user;
const categoryColletion = db.categoryUser;

class UserRepository {
  constructor () {
    
  }

  async insertUser (objectUser) {
    
    userColletion.create(objectUser);
    return { rowAffect: 1 };
 
   }

  async consultUser () {
    
   const resultConsultUser = userColletion.findAll({  
      attributes:['name'],    
      include:[{
        model: categoryColletion,
        attributes:['description', 'permissionToViewTask']
      }]
    })

    return resultConsultUser;

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
