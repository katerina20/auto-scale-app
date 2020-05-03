const transactionsService = require('../services/transactionsService');

exports.getAllIn = async (req, res, next) => {
  return res.json(await transactionsService.getAllIn());
};

exports.getAllOut = async (req, res, next) => {
  return res.json(await transactionsService.getAllOut());
};

exports.getOutStat = async (req, res, next) => {
  return res.json(await transactionsService.getOutStat());
};
