const { BadRequest } = require("../../../src/common/ExceptionHandler");
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
  });
});
