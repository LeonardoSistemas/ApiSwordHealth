module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "MySql2021!",
    DB: "desafiosword",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  