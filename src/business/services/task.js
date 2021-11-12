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
}

module.exports = TaskService;
