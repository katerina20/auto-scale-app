const models = require("../db");
const itemModel = models.items;
const transactionsOutModel = models.transactionsOuts;
const providersModel = models.providers;

exports.getAll = async () => {
  return itemModel.findAll({include: [providersModel]});
};

exports.addWeight = async (item, weight) => {
  console.log(item.amount + weight);
  console.log(item.amount + weight);
  return await itemModel.update({amount: item.amount + weight}, {
    where: {
      id: item.id
    }
  });
};

exports.substWeight = async (item, weight) => {
  return itemModel.update({amount: item.amount - weight}, {
    where: {
      id: item.id
    }
  });
};

exports.edit = async (item) => {
  return await itemModel.update({
    price: item.price,
    providerId: item.providerId,
    amount: item.amount
  }, {
    where: {
      id: item.id
    }
  })
};

exports.getStatistic = async (id) => {
  return transactionsOutModel.sequelize.query("SELECT date, SUM(weight) AS 'weight_total'" +
    "FROM transactionsOuts " +
    "WHERE itemId = (:id) " +
    "GROUP BY CAST(date AS Date) " +
    "ORDER BY date DESC " +
    "LIMIT 10", {
    replacements: {id},
    type: transactionsOutModel.sequelize.QueryTypes.SELECT })
};
