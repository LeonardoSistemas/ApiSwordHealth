const { BadRequest, NotFoundError, UnauthorizedError } = require("../../common/ExceptionHandler");
const TaskRepository = require("../repository/task");
const SendMessageBroker = require("./sendMessageBroker");
const UserRepository = require("../repository/user");

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.sendMessageBroker = new SendMessageBroker();
    this.userRepository = new UserRepository();
  }

  async consultTask(userId) {
    const resultCheckQueryPermission = await this.checkQueryPermission(userId);
    if (resultCheckQueryPermission) {
      const resultConsultTask = await this.taskRepository.consultAllTask();
      return resultConsultTask;
    }
    else {
      const resultConsultTask = await this.taskRepository.consultUserTask(userId);
      return resultConsultTask;
    }

  }

  async checkQueryPermission(userId) {

    const resultConsultPermissionUser = await this.userRepository.consultUserById(userId);
    if (!resultConsultPermissionUser)
      return false;

    if (resultConsultPermissionUser[0].permissionToViewTask === 0)
      return false;
    else
      return true;
  }

  async insertTask(objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Insert Task Services | the task object is not in a correct format").message;

    const returnValidateDescriptionLength = await this.validateDescriptionLength(objectTask);
    if (!returnValidateDescriptionLength)
      return new BadRequest("Insert Task Services | the description size is too big").message;

    const resultInsertTask = await this.taskRepository.insertTask(objectTask);
    return resultInsertTask;
  }

  async updateTask(objectTask) {

    const returnValidateObject = await this.validateObjectTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Update Task Services | the task object is not in a correct format").message;

    const returnValidateDescriptionLength = await this.validateDescriptionLength(objectTask);
    if (!returnValidateDescriptionLength)
      return new BadRequest("Update Task Services | the description size is too big").message;

    const returnConsultTaskByID = await this.taskRepository.consultTaskByID(objectTask)
    if (!returnConsultTaskByID)
      return new NotFoundError("Update Task Services | no tasks found for this id").message;

    const resultUpdateTask = await this.taskRepository.updateTask(objectTask);
    this.completeTask(objectTask);
    return resultUpdateTask;
  }

  async completeTask(objectTask) {

    const returnValidateObject = await this.validateObjectCompleteTask(objectTask);
    if (!returnValidateObject)
      return new BadRequest("Complete Task Services | the task object is not in a correct format").message;

    const returnValidateDescriptionLength = await this.validateDescriptionLength(objectTask);
    if (!returnValidateDescriptionLength)
      return new BadRequest("Complete Task Services | the description size is too big").message;

    const resultCompleteTask = await this.taskRepository.completeTask(objectTask);

    const returnConsultTaskByID = await this.taskRepository.queryTaskToSendToMessageBroker(objectTask)
    
    if (!returnConsultTaskByID)
      return new NotFoundError("Complete Task Services | no tasks found for this id").message;
    this.sendTaskMessageBroker(JSON.stringify(returnConsultTaskByID));
    return resultCompleteTask;
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

  async sendTaskMessageBroker(objectTask) {
    const obecjtMessageBroker = JSON.parse(objectTask)
    if (obecjtMessageBroker[0].task.complete === 1)
      this.sendMessageBroker.send(objectTask);

    return true;
  }

  async deleteTask(idTask, userId) {

    if (!idTask)
      return new NotFoundError("Delete Task Services | idTask value is invalid").message;

    const resultCheckQueryPermission = await this.checkQueryPermission(userId)
    if (resultCheckQueryPermission) {
      const resultDeleteTask = await this.taskRepository.deleteTask(parseInt(idTask));
      return resultDeleteTask;
    }
    else
      return new UnauthorizedError("Delete Task Services | Unauthorized").message;
  }


}

module.exports = TaskService;
