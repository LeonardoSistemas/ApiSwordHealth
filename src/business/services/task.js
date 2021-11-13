const { BadRequest } = require("../../common/ExceptionHandler");
const TaskRepository = require("../repository/task");

class TaskService {
  constructor () {
    this.taskRepository = new TaskRepository();
  }  

  async consultTask () {
    const resultConsultTask = await this.taskRepository.consultTask();
    return resultConsultTask;
  }

  async insertTask (objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if(!returnValidateObject)
      return new BadRequest("Insert Task Services | the task object is not in a correct format").message;
    const resultInsertTask = await this.taskRepository.insertTask(objectTask);
    return resultInsertTask;
  }

  async validateObjectTask (objectTask){
    const { description } = objectTask
      if (!description) {
        return false
      }
      return true
  }
}

module.exports = TaskService;
