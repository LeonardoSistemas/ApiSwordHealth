const { BadRequest } = require("../../common/ExceptionHandler");

class UserRepository {
  constructor () {
    
  }

  async consultUser () {
    
    return [{id:1, name:"Leonardo"},{id:2, name:"João"}];
  }
}

module.exports = UserRepository;
