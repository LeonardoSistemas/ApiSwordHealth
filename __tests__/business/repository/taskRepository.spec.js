const { BadRequest } = require("../../../src/common/ExceptionHandler");
const TaskRepository = require("../../../src/business/repository/task");
const taskRepository = new TaskRepository();

describe("TaskRepository", () => {
  describe("- SUCESS CASES -", () => {    
    it("consultUser | Ensure that the task was successfully consulted", async () => {      
      
      const result = await taskRepository.consultTask();

      expect(result).toBeTruthy();
    });
  });
  /* describe("- ERROR CASES -", () => {
    
  }); */
});
