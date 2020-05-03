const sequelize = require("sequelize");

const models = require("../db");
const itemModel = models.items;
const transactionsOutModel = models.transactionsOuts;

exports.getAll = async () => {
  return itemModel.findAll();
};

exports.addWeight = async (item, weight) => {
  console.log(item.amount + weight);
  return await itemModel.update({weight: item.amount + weight}, {
    where: {
      id: item.id
    }
  });
};

exports.substWeight = async (item, weight) => {
  return itemModel.update({weight: item.amount - weight}, {
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
  return ;
  // return await transactionsOutModel.sequelize.query("SELECT date, SUM(weight) " +
  //   "FROM transactionsOuts " +
  //   "WHERE itemId = `id` " +
  //   "GROUP BY CAST(date AS Date) " +
  //   "ORDER BY date DESC " +
  //   "LIMIT 10", { type: transactionsOutModel.sequelize.QueryTypes.SELECT })
};

let items = [
  {
    "name": "Apple",
    "price": 33,
    "provider": 1,
    "amount": 24.3
  },
  {
    "name": "Banana",
    "price": 23,
    "provider": 1,
    "amount": 124.2
  },
  {
    "name": "Orange",
    "price": 46,
    "provider": 1,
    "amount": 44
  },
  {
    "name": "Tomato",
    "price": 32,
    "provider": 1,
    "amount": 90.32
  },
  {
    "name": "Lemon",
    "price": 67.3,
    "provider": 1,
    "amount": 48.1
  }
];

exports.init = async () => {
  // return ;
  await itemModel.update({providerId: 1}, {where: {}});
};
