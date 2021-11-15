module.exports = (sequelize, Sequelize) => {
    const categoryUser = sequelize.define("categoryUser", {
        categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permissionToViewTask: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return categoryUser;
  };
  