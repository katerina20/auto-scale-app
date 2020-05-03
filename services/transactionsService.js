const models = require("../db");
const transactionsInModel = models.transactionsIns;
const transactionsOutModel = models.transactionsOuts;

exports.getAllIn = async () => {
  return transactionsInModel.findOne();
};

exports.getAllOut = async () => {
  return transactionsOutModel.findAll();
};

exports.getOutStat = async () => {
  let month = new Date().getMonth() + 1;
  return await sequelize.query("SELECT date, SUM(price) " +
    "FROM transactionsOut " +
    "WHERE strftime('%m', date_trans)= `month` " +
    "GROUP BY CAST(date AS Date) " +
    "ORDER BY date DESC ", { type: QueryTypes.SELECT })
};

exports.addIn = async (id, weight) => {
  return transactionsInModel.create({ itemId: id, weight: weight, date: new Date()});
};

exports.addOut = async (item, weight) => {
  return transactionsOutModel.create({ itemId: item.id, weight: weight, price: item.price * weight, date: new Date()});
};
