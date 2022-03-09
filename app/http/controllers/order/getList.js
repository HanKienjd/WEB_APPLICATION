const Joi = require('joi');

const orderService = require('../../services/order');
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
  const { limit, page, userId } = req.query;

  await validation({ limit, page });

  const orders = await orderService.getList({ limit, page, userId });

  return res.status(200).send(orders);
}

module.exports = getList;
