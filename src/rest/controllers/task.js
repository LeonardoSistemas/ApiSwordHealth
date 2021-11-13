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

  async insertTask (req, res, next) {
    try {

      let objectTask = {
        id: req.body.id,
        description: req.body.description
      }
      const resultInsertTask = await this.taskService.insertTask(objectTask); 

      res.send(resultInsertTask);

      next();
    } catch (error) { next(error); }
  }
}

module.exports = TaskController;
