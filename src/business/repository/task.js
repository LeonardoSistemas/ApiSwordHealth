const { BadRequest } = require("../../common/ExceptionHandler");

class TaskRepository {
  constructor () {
    
  }

  async consultTask () {
    
    return [{id:1, description:"Desenvolver API"},{id:2, description:"Desenvolver API Sword"}];
  }
}

module.exports = TaskRepository;
