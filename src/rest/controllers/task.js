const TaskService = require("../../business/services/task");

class TaskController {
  constructor () {
    this.taskService = new TaskService();
  }  

  async consultTask (req, res, next) {
    try {
      const resultConsultTask = await this.taskService.consultTask(req.params.userId); 

      res.send(resultConsultTask);

      next();
    } catch (error) { next(error); }
  }

  async insertTask (req, res, next) {
    try {

      let objectTask = {
        id: req.body.id,
        description: req.body.description,
        userId: req.body.userId
      }
      const resultInsertTask = await this.taskService.insertTask(objectTask); 

      res.send(resultInsertTask);

      next();
    } catch (error) { next(error); }
  }

  async updateTask (req, res, next) {
    try {

      let objectTask = {
        id: req.body.id,
        description: req.body.description,
        complete: req.body.complete
      }
      const resultUpdateTask = await this.taskService.updateTask(objectTask); 

      res.send(resultUpdateTask);

      next();
    } catch (error) { next(error); }
  }

  async completeTask (req, res, next) {
    try {

      let objectTask = {
        id: req.body.id,
        description: req.body.description,
        complete: req.body.complete,
        completiondate: req.body.completiondate
      }
      const resultUpdateTask = await this.taskService.completeTask(objectTask); 

      res.send(resultUpdateTask);

      next();
    } catch (error) { next(error); }
  }

  async deleteTask (req, res, next) {
    try {
      const idTask = req.params.id
      const userId = req.body.userId      
      const resultDeleteTask = await this.taskService.deleteTask(parseInt(idTask), parseInt(userId)); 

      res.send(resultDeleteTask);

      next();
    } catch (error) { next(error); }
  }
}

module.exports = TaskController;
