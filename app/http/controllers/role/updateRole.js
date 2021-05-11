const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const roleService = require('../../services/role');

const validation = async ({ name, policies, roleId }) => {
  try {
    const schema = Joi.object().keys({
      roleId: Joi.number().required(),
      name: Joi.string().required(),
      policies: Joi.array().items(Joi.number().integer().allow(null)).required(),
    });

    return await schema.validateAsync({ name, policies, roleId });
  } catch (e) {
    return abort(400, 'Params Error');
  }
};

const updateRole = async (req, res) => {
  const { name, policies } = req.body;
  const { roleId } = req.params;

  await validation({ name, policies, roleId });
  await roleService.updateRole({ name, policies, roleId });
  res.sendStatus(204);
};

module.exports = updateRole;
