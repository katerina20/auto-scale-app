const Sequelize = require("sequelize");

module.exports = (sequelize, Provider) => {
  const Item = sequelize.define(
    "items",
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

      price: {
        type: Sequelize.DECIMAL,
        min: 0,
        allowNull: false
      },

      providerId: {
        type: Sequelize.INTEGER,
        references: {
          model: Provider,
          key: "id"
        }
      },

      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    }
  );

  Provider.hasMany(Item);
  Item.belongsTo(Provider, {
    foreignKey: "providerId"
  });

  return Item;
};
