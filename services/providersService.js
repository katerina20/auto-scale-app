const models = require("../db");
const providersModel = models.providers;

exports.getAll = async () => {
  return providersModel.findAll();
};

exports.add = async (provider) => {
  return providersModel.create({
    ...provider
  });
};

exports.edit = async (provider) => {
  return providersModel.update({
    name: provider.name,
    phone: provider.phone,
    address: provider.address
  });
};
