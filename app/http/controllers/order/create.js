const Joi = require('joi');

const orderService = require('../../services/order');
const { abort } = require('../../../helpers/error');

async function validation(orderDetail) {
  try {
    const orderDetailSchema = Joi.object().keys({
      book_id: Joi.number().min(1),
      quantity: Joi.number().min(0),
      start_date: '',
      end_date: '',
    });

    const schema = Joi.array().items(orderDetailSchema);

    return await schema.validateAsync(orderDetail);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  const { orderDetail } = req.body;
  const { userId } = req.body;

  await validation(orderDetail);

  await orderService.create({ orderDetail, userId });

  return res.status(201).send();
}

module.exports = create;
