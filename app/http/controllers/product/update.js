const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({
  productId,
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
      productId: Joi.number().min(1),
      name: Joi.string(),
      status: Joi.number(),
      buyingPrice: Joi.number().min(0),
      sellingPrice: Joi.number().min(0),
      quantity: Joi.number().min(0),
      description: Joi.string(),
      categoryId: Joi.number().integer().min(0),
    });

    return await schema.validateAsync({
      productId,
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

async function update(req, res) {
  const {
    name,
    status,
    buyingPrice,
    sellingPrice,
    quantity,
    description,
    categoryId,
  } = req.body;
  const { productId } = req.params;
  const productImg = req.file.filename;

  await validation({
    productId,
    name,
    status,
    buyingPrice,
    sellingPrice,
    quantity,
    description,
    categoryId,
  });

  await productService.update({
    productId,
    name,
    status,
    buyingPrice,
    sellingPrice,
    quantity,
    description,
    categoryId,
    productImg,
  });

  return res.status(204).send();
}

module.exports = update;
