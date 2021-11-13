const { BadRequest, NotFoundError } = require("../../common/ExceptionHandler");
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

  async updateTask (objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if(!returnValidateObject)
      return new BadRequest("Update Task Services | the task object is not in a correct format").message;
    
    const returnConsultTaskByID = await this.taskRepository.consultTaskByID(objectTask)
    if(!returnConsultTaskByID)
      return new NotFoundError("Update Task Services | no tasks found for this id").message;

    const resultUpdateTask = await this.taskRepository.updateTask(objectTask);
    return resultUpdateTask;
  }

  async validateObjectTask (objectTask){
    const { description } = objectTask
      if (!description) {
        return false
      }
      return true
  }

  async deleteTask (idTask) {
    
    if(!idTask)
      return new NotFoundError("Delete Task Services | idTask value is invalid").message;
    const resultDeleteTask = await this.taskRepository.deleteTask(parseInt(idTask));
    return resultDeleteTask;
  }
}

module.exports = TaskService;
