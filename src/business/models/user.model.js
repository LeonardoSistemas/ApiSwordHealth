const categoryUserModel = require("./categoryUser.model");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        categoryUserCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

   
    /* User.hasOne(categoryUserModel, {
        foreignKey: {
            name: 'categoryId'
        }
    }) */
    return User;
};
