const providersService = require('../services/providersService');

exports.getAll = async (req, res, next) => {
  return res.json(await providersService.getAll());
};

exports.add = async (req, res, next) => {
  return res.json(await providersService.add(req.body));
};

exports.edit = async (req, res, next) => {
  return res.json(await providersService.edit(req.body));
};
