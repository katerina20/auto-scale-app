const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Provider = sequelize.define(
    "providers",
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },

      address: {
        type: Sequelize.STRING,
      }
    }
  );

  return Provider;
};
