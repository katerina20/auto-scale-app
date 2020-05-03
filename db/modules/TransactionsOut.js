const Sequelize = require("sequelize");

module.exports = (sequelize, Item) => {
  const TransactionsOut = sequelize.define(
    "transactionsOuts",
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },

      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: Item,
          key: "id"
        }
      },

      weight: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }
  );

  Item.hasMany(TransactionsOut);
  TransactionsOut.belongsTo(Item, {
    foreignKey: "itemId"
  });

  return TransactionsOut;
};
