const dbConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

db.task = require("./task.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.categoryUser = require("./categoryUser.model.js")(sequelize, Sequelize);

db.categoryUser.hasOne(db.user);
db.user.belongsTo(db.categoryUser, {foreignKey: 'categoryUserCategoryId'});

db.user.hasOne(db.task);
db.task.belongsTo(db.user, {foreignKey: 'userId'});

module.exports = db;
