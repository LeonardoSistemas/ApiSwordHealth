const { BadRequest, NotFoundError } = require("../../../src/common/ExceptionHandler");
const TaskService = require("../../../src/business/services/task");
const taskService = new TaskService();

describe("TaskService", () => {
  describe("- SUCESS CASES -", () => {
    it("consultTask | Ensure that the task was successfully consulted", async () => {
      const taskRepositoryReturnMock = {
        id: 1,
        description: "Desenvolver API"
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "consultTask")
        .mockImplementationOnce(createTaskRepositoryMock);
      const result = await taskService.consultTask();

      expect(result).toBe(taskRepositoryReturnMock);
    });

    it("insertTask | Ensure that the task was successfully inserted", async () => {
      const objectTask = {
        id: 3,
        description: "Test API"
      };

      const taskRepositoryReturnMock = {
        rowAffect: 1
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "insertTask")
        .mockImplementationOnce(createTaskRepositoryMock);
      const result = await taskService.insertTask(objectTask);

      expect(result).toBe(taskRepositoryReturnMock);
    });

    it("udpateTask | Ensure that the task was successfully changed", async () => {
      const objectTask = {
        id: 3,
        description: "Test API Success"
      };

      const taskRepositoryReturnMock = {
        rowAffect: 1
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "updateTask")
        .mockImplementationOnce(createTaskRepositoryMock);

      const returnTaskByIDMock = {};

      const consultTaskRepositoryByIDMock = () => returnTaskByIDMock;

      jest.spyOn(
        taskService.taskRepository,
        "consultTaskByID")
        .mockImplementationOnce(consultTaskRepositoryByIDMock);

      const result = await taskService.updateTask(objectTask);

      expect(result).toBe(taskRepositoryReturnMock);
    });

  });
  describe("- ERROR CASES -", () => {
    it("insertTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      try {
        const result = await taskService.insertTask(objectTask);
      } catch (error) {
        expect(error.name).toBe("BadRequest");
        expect(error.message).toBe("Insert Task Services | the task object is not in a correct format");
      }
    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Services | the task object is not in a correct format").message);

    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 4,
        description: "Test API"
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new NotFoundError("Update Task Services | no tasks found for this id").message);
      expect(new NotFoundError().status).toBe(404);

    });
  });
});
