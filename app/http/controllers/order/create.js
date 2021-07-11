const Joi = require('joi');

const orderService = require('../../services/order');
const { abort } = require('../../../helpers/error');

async function validation(orderDetail) {
  try {
    const orderDetailSchema = Joi.object().keys({
      productId: Joi.number().min(1),
      quantity: Joi.number().min(0),
      price: Joi.number().min(1),
    });

    const schema = Joi.array().items(orderDetailSchema);

    return await schema.validateAsync(orderDetail);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  const orderDetail = req.body;
  const { id } = req.user;

  await validation(orderDetail);

  await orderService.create({ orderDetail, id });

  return res.status(201).send();
}

module.exports = create;
