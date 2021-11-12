const TaskService = require("../../business/services/task");

class TaskController {
  constructor () {
    this.taskService = new TaskService();
  }  

  async consultTask (req, res, next) {
    try {
      const resultConsultTask = await this.taskService.consultTask(); 

      res.send(resultConsultTask);

      next();
    } catch (error) { next(error); }
  }
}

module.exports = TaskController;
