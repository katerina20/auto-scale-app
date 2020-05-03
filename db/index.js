const Sequelize = require("sequelize");
const config = require("config");
const dbConfig = config.get("dbConfig");

const Items = require('./modules/Item');
const Providers = require('./modules/Provider');
const TransactionsIn = require('./modules/TransactionsIn');
const TransactionsOut = require('./modules/TransactionsOut');


const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.userName,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: dbConfig.path,
    ssl: true,
    logging: false
  },
);

const providers = Providers(sequelize);
const items = Items(sequelize, providers);
const transactionsIns = TransactionsIn(sequelize, items);
const transactionsOuts = TransactionsOut(sequelize, items);

sequelize.sync({
  alter: true
});

module.exports = {providers, items, transactionsIns, transactionsOuts};
