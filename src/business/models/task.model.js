module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complete: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      completiondate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    });
  
    return Task;
  };
  