const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const roleService = require('../../services/role');

const validation = async ({ name, policies }) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      policies: Joi.array().items(Joi.number().integer().allow(null)).required(),
    });

    return await schema.validateAsync({ name, policies });
  } catch (e) {
    return abort(400, 'Params Error');
  }
};

const addRole = async (req, res) => {
  const { name, policies } = req.body;
  await validation({ name, policies });
  await roleService.addRole({ name, policies });
  res.sendStatus(201);
};

module.exports = addRole;
