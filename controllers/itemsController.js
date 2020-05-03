const itemsService = require('../services/itemsService');
const transactionsService = require('../services/transactionsService');

exports.getAll = async (req, res, next) => {
  return res.json(await itemsService.getAll());
};

exports.addWeight = async (req, res, next) => {
  await itemsService.addWeight(req.body.item, req.body.weight);
  return res.json(await transactionsService.addIn(req.body.item.id, req.body.weight));
};

exports.substWeight = async (req, res, next) => {
  await itemsService.substWeight(req.body.item, req.body.weight);
  return res.json(await transactionsService.addOut(req.body.item, req.body.weight));
};

exports.edit = async (req, res, next) => {
  return res.json(await itemsService.edit());
};

exports.getStatistic = async (req, res, next) => {
  return res.json(await itemsService.getStatistic(req.params.id));
};

exports.init = async (req, res, next) => {
  return res.json(await itemsService.init());
};
