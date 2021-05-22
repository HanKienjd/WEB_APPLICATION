const Joi = require('joi');

const advertisementService = require('../../services/advertisement');
const { abort } = require('../../../helpers/error');

async function validation({ advertisementId }) {
  try {
    const schema = Joi.object().keys({
      advertisementId: Joi.number().integer().min(1),
    });

    return await schema.validateAsync({ advertisementId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function remove(req, res) {
  const { advertisementId } = req.params;

  await validation({ advertisementId });

  await advertisementService.remove({ advertisementId });

  return res.status(204).send();
}

module.exports = remove;
