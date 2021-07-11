const Joi = require('joi');

const advertisementService = require('../../services/advertisement');
const { abort } = require('../../../helpers/error');

async function validation({
  productId,
  content,
}) {
  try {
    const schema = Joi.object().keys({
      productId: Joi.number().min(1),
      content: Joi.string(),
      advertisementId: Joi.number().min(1),
    });

    return await schema.validateAsync({
      productId,
      content,
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const {
    productId,
    content,
  } = req.body;
  const { advertisementId } = req.params;
  const advertisementImg = req.file.filename;

  await validation({
    productId,
    content,
    advertisementId,
  });

  await advertisementService.update({
    productId,
    content,
    advertisementImg,
    advertisementId,
  });

  return res.status(204).send();
}

module.exports = update;
