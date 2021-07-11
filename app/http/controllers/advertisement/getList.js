const Joi = require('joi');

const productService = require('../../services/advertisement');
const { abort } = require('../../../helpers/error');

async function validation({ limit, page }) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
    });

    return await schema.validateAsync({ limit, page });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getList(req, res) {
  const { limit, page } = req.query;

  await validation({ limit, page });

  const products = await productService.getList({ limit, page });

  return res.status(200).send(products);
}

module.exports = getList;
