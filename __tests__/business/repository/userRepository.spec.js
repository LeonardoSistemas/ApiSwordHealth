const { BadRequest } = require("../../../src/common/ExceptionHandler");
const UserRepository = require("../../../src/business/repository/user");
const userRepository = new UserRepository();

describe("UserRepository", () => {
  describe("- SUCESS CASES -", () => {    
    it("consultUser | Ensure that the user was successfully consulted", async () => {      
      
      const result = await userRepository.consultUser();

      expect(result).toBeTruthy();
    });
  });
  /* describe("- ERROR CASES -", () => {
    
  }); */
});
