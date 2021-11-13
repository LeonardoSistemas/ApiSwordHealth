const { BadRequest } = require("../../common/ExceptionHandler");

let arrayTask = [{id:1, description:"Desenvolver API"},{id:2, description:"Desenvolver API Sword"}]
class TaskRepository {
  constructor () {
    
  }

  async consultTask () {
    
    return arrayTask;
  }

  async insertTask (objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if(!returnValidateObject)
      return new BadRequest("Insert Task Repository | the task object is not in a correct format").message;
    
    arrayTask.push(objectTask)
    return {rowAffect: 1};
  }

  async validateObjectTask (objectTask){
    const { description } = objectTask
      if (!description) {
        return false
      }
      return true
  }
}

module.exports = TaskRepository;
