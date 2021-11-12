const { BadRequest } = require("../../../src/common/ExceptionHandler");
const UserService = require("../../../src/business/services/user");
const userService = new UserService();

describe("UserService", () => {
  describe("- SUCESS CASES -", () => {    
    it("consultUser | Ensure that the user was successfully consulted", async () => {
      const userRepositoryReturnMock = {
        id: 1,
        name: "Leonardo"
      };

      const createUserRepositoryMock = () => userRepositoryReturnMock;

      jest.spyOn(
        userService.userRepository,
        "consultUser")
        .mockImplementationOnce(createUserRepositoryMock);
      const result = await userService.consultUser();

      expect(result).toBe(userRepositoryReturnMock);
    });
  });
  /* describe("- ERROR CASES -", () => {
    
  }); */
});
