const CategoryUserService = require("../../business/services/categoryUser");

class CategoryUserController {
  constructor () {
    this.categoryUserService = new CategoryUserService();
  }  

  async insertcategoryUser (req, res, next) {
    try {
      const objectCategoryUser = {
        description: req.body.description,
        permissionToViewTask: req.body.permissionToViewTask
      }
      const resultInsertCategoryUser = await this.categoryUserService.insertcategoryUser(objectCategoryUser); 

      res.send(resultInsertCategoryUser);

      next();
    } catch (error) { next(error); }
  }
  
  async consultcategoryUser (req, res, next) {
    try {      
      const resultConsultCategoryUser = await this.categoryUserService.consultcategoryUser(); 

      res.send(resultConsultCategoryUser);

      next();
    } catch (error) { next(error); }
  }
}

module.exports = CategoryUserController;
