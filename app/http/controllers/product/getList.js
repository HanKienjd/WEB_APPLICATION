const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({ limit, page, categoryIds }) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      categoryIds: Joi.array().items(Joi.number()),
    });

    return await schema.validateAsync({ limit, page, categoryIds });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getList(req, res) {
  const { limit, page } = req.query;
  let { categoryIds } = req.query;

  categoryIds = categoryIds ? JSON.parse(categoryIds) : undefined;

  await validation({ limit, page, categoryIds });

  const products = await productService.getList({ limit, page, categoryIds });

  return res.status(200).send(products);
}

module.exports = getList;
