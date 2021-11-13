const { BadRequest } = require("../../../src/common/ExceptionHandler");
const TaskRepository = require("../../../src/business/repository/task");
const taskRepository = new TaskRepository();

describe("TaskRepository", () => {
  describe("- SUCESS CASES -", () => {    
    it("consultUser | Ensure that the task was successfully consulted", async () => {      
      
      const result = await taskRepository.consultTask();

      expect(result).toBeTruthy();
    });

    it("insetTask | Ensure that the task was successfully inserted", async () => {
      const objectTask = {
        id: 3,
        description: "Test API"
      };
     
      const result = await taskRepository.insertTask(objectTask);

      expect(result).toBeDefined();
    });
  });
  describe("- ERROR CASES -", () => {
    it("insertTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      try {
        const result = await taskRepository.insertTask(objectTask);
      } catch (error) {        
        expect(error.name).toBe("BadRequest");
        expect(error.message).toBe("Insert Task Repository | the task object is not in a correct format");
      }      
    });
  });
});
