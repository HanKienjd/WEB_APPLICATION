const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const roleService = require('../../services/role');

const validation = async ({ roleId }) => {
  try {
    const schema = Joi.object().keys({
      roleId: Joi.number().required(),
    });

    return await schema.validateAsync({ roleId });
  } catch (e) {
    return abort(400, 'Params Error');
  }
};

const removeRole = async (req, res) => {
  const { roleId } = req.params;

  await validation({ roleId });
  await roleService.removeRole({ roleId });
  res.sendStatus(204);
};

module.exports = removeRole;
