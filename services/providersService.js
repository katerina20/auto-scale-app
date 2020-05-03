const models = require("../db");
const providersModel = models.providers;

exports.getAll = async () => {
  return providersModel.findAll();
};

exports.add = async (provider) => {
  console.log(provider);
  const newProvider = await providersModel.create(provider.provider);
  return newProvider;
};

exports.edit = async (provider) => {
  return providersModel.update({
    name: provider.name,
    phone: provider.phone,
    address: provider.address
  }, {
    where: {
      id: provider.id
    }
  });
};
