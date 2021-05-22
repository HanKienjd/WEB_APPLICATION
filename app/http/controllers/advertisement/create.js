const Joi = require('joi');

const advertisementService = require('../../services/advertisement');
const { abort } = require('../../../helpers/error');

async function validation({
  content,
  productId,
}) {
  try {
    const schema = Joi.object().keys({
      content: Joi.string(),
      productId: Joi.number().integer().min(0),
    });

    return await schema.validateAsync({
      content,
      productId,
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  const {
    content,
    productId,
  } = req.body;
  const advertisementImg = req.file.filename;

  await validation({
    content,
    productId,
  });

  await advertisementService.create({
    content,
    productId,
    advertisementImg,
  });

  return res.status(201).send();
}

module.exports = create;
