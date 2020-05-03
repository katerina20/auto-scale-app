const Sequelize = require("sequelize");

module.exports = (sequelize, Item) => {
  const TransactionsIn = sequelize.define(
    "transactionsIns",
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

      date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }
  );

  Item.hasMany(TransactionsIn);
  TransactionsIn.belongsTo(Item, {
    foreignKey: "itemId"
  });

  return TransactionsIn;
};
