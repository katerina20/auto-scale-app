const models = require("../db");
const transactionsInModel = models.transactionsIns;
const transactionsOutModel = models.transactionsOuts;

exports.getAllIn = async () => {
  return transactionsInModel.findAll();
};

exports.getAllOut = async () => {
  return transactionsOutModel.findAll();
};

exports.getOutStat = async () => {
  let month = new Date().getMonth() + 1;
  month = month < 10 ? 0 + '' + month : month;
  return transactionsOutModel.sequelize.query("SELECT DATE(date) AS date_m, SUM(price) AS 'price_total' " +
      "FROM transactionsOuts " +
      "WHERE strftime('%m', date)= (:month) " +
      "GROUP BY date_m " +
      "ORDER BY date DESC ", {
    replacements: {month},
    type: transactionsOutModel.sequelize.QueryTypes.SELECT
  });
};

exports.addIn = async (id, weight) => {
  return transactionsInModel.create({ itemId: id, weight: weight, date: new Date()});
};

exports.addOut = async (item, weight) => {
  return transactionsOutModel.create({ itemId: item.id, weight: weight, price: item.price * weight, date: new Date()});
};
