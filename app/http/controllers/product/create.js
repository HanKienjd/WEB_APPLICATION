const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({
  name,
  status,
  buyingPrice,
  sellingPrice,
  quantity,
  description,
  categoryId,
}) {
  try {
    const schema = Joi.object().keys({
      name: Joi.string(),
      status: Joi.number(),
      buyingPrice: Joi.number().min(0),
      sellingPrice: Joi.number().min(0),
      quantity: Joi.number().min(0),
      description: Joi.string(),
      categoryId: Joi.number().integer().min(0),
    });

    return await schema.validateAsync({
      name,
      status,
      buyingPrice,
      sellingPrice,
      quantity,
      description,
      categoryId,
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  const {
    name,
    status,
    buyingPrice,
    sellingPrice,
    quantity,
    description,
    categoryId,
  } = req.body;
  const productImg = req.file.filename;

  await validation({
    name,
    status,
    buyingPrice,
    sellingPrice,
    quantity,
    description,
    categoryId,
  });

  await productService.create({
    name,
    status,
    buyingPrice,
    sellingPrice,
    quantity,
    description,
    categoryId,
    productImg,
  });

  return res.status(201).send();
}

module.exports = create;
