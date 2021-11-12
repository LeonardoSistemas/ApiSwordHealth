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
  });
  /* describe("- ERROR CASES -", () => {
    
  }); */
});
