const { BadRequest, NotFoundError } = require("../../../src/common/ExceptionHandler");
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

    it("udpateTask | Ensure that the task was successfully changed", async () => {
      const objectTask = {
        id: 3,
        description: "Test API - update successfully"
      };

      const result = await taskRepository.updateTask(objectTask);

      expect(result).toBeDefined();
    });

    it("deleteTask | Ensure that the task was successfully deleted", async () => {
      const idTask = 3;

      const result = await taskRepository.deleteTask(idTask);

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
    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      const result = await taskRepository.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Repository | the task object is not in a correct format").message);

    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 4,
        description: "Test API"
      };

      const result = await taskRepository.updateTask(objectTask);
      expect(result).toBe(new NotFoundError("Update Task Repository | no tasks found for this id").message);
      expect(new NotFoundError().status).toBe(404);

    });

    it("deleteTask | Ensure idtask is empty", async () => {

      const result = await taskRepository.deleteTask();
      expect(result).toBe(new NotFoundError("Delete Task Repository | idTask value is invalid").message);
      expect(new NotFoundError().status).toBe(404);

    });
  });
});
