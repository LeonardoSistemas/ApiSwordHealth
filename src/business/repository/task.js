const { BadRequest, NotFoundError } = require("../../common/ExceptionHandler");

let arrayTask = [{ id: 1, description: "Desenvolver API" }, { id: 2, description: "Desenvolver API Sword" }]
class TaskRepository {
  constructor() {

  }

  async consultTask() {

    return arrayTask;
  }

  async consultTaskByID(objectTask) {

    let findTask = false;

    arrayTask.forEach((elemento) => {
      if (elemento.id === objectTask.id)
        findTask = true
    })
    return findTask;
  }

  async insertTask(objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Insert Task Repository | the task object is not in a correct format").message;

    arrayTask.push(objectTask)
    return { rowAffect: 1 };
  }

  async updateTask(objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Update Task Repository | the task object is not in a correct format").message;

    const returnConsultTaskByID = await this.consultTaskByID(objectTask)
    if (!returnConsultTaskByID)
      return new NotFoundError("Update Task Repository | no tasks found for this id").message;

    arrayTask.forEach((elemento, indice) => {
      if (elemento.id === objectTask.id)
        arrayTask.splice(indice, 1)
    })
    arrayTask.push(objectTask)
    return { rowAffect: 1 };
  }

  async validateObjectTask(objectTask) {
    const { description } = objectTask
    if (!description) {
      return false
    }
    return true
  }
}

module.exports = TaskRepository;
