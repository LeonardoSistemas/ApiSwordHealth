module.exports = {
    HOST: "mysqlsrv",
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
  