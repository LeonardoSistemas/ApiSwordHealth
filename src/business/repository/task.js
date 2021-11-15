const { BadRequest, NotFoundError } = require("../../common/ExceptionHandler");
const db = require("../models")
const taskColletion = db.task;
const userColletion = db.user

class TaskRepository {
  constructor() {

  }

  async consultTask() {
    let dataTask = await taskColletion.findAll({
      attributes:['description', 'complete'],    
      include:[{
        model: userColletion,
        attributes:['name']
      }]
    });
    return dataTask;
  }

  async consultTaskByID(objectTask) {

    let findTask = taskColletion.findByPk(objectTask.id)
    return findTask;
  }

  async insertTask(objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Insert Task Repository | the task object is not in a correct format").message;

    const returnValidateDescriptionLength = await this.validateDescriptionLength(objectTask);
    if (!returnValidateDescriptionLength)
      return new BadRequest("Insert Task Repository | the description size is too big").message;
    
    taskColletion.create(objectTask);
    return { rowAffect: 1 };
  }

  async updateTask(objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Update Task Repository | the task object is not in a correct format").message;

    const returnValidateDescriptionLength = await this.validateDescriptionLength(objectTask);
    if (!returnValidateDescriptionLength)
      return new BadRequest("Update Task Repository | the description size is too big").message;

    const returnConsultTaskByID = await this.consultTaskByID(objectTask)
    if (!returnConsultTaskByID)
      return new NotFoundError("Update Task Repository | no tasks found for this id").message;

    let returnUpdate = await taskColletion.update(objectTask, { where: { id: objectTask.id } })
    return { rowAffect: returnUpdate[0] };
  }

  async completeTask(objectTask) {

    const returnValidateObject = await this.validateObjectCompleteTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Complete Task Repository | the task object is not in a correct format").message;

    const returnValidateDescriptionLength = await this.validateDescriptionLength(objectTask);
    if (!returnValidateDescriptionLength)
      return new BadRequest("Complete Task Repository | the description size is too big").message;

    const returnConsultTaskByID = await this.consultTaskByID(objectTask)
    if (!returnConsultTaskByID)
      return new NotFoundError("Complete Task Repository | no tasks found for this id").message;

    let returnComplete = await taskColletion.update(objectTask, { where: { id: objectTask.id } })
    return { rowAffect: returnComplete[0] };
  }

  async validateObjectTask(objectTask) {
    const { description } = objectTask
    if (!description) {
      return false
    }
    return true
  }

  async validateObjectCompleteTask(objectTask) {
    const { description, complete, completiondate } = objectTask
    if (!description || !complete || !completiondate) {
      return false
    }
    return true
  }

  async validateDescriptionLength(objectTask) {
    const { description } = objectTask
    if (description.length > 2500) {
      return false
    }
    return true

  }

  async deleteTask(idTask) {

    if (!idTask)
      return new BadRequest("Delete Task Repository | idTask value is invalid").message;

    let returnDelete = await taskColletion.destroy({ where: { id:idTask } })
    return { rowAffect: returnDelete[0] };
  }
}

module.exports = TaskRepository;
