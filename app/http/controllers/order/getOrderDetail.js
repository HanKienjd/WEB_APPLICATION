const Joi = require('joi');

const orderService = require('../../services/order');
const { abort } = require('../../../helpers/error');

async function validation({ orderId }) {
  try {
    const schema = Joi.object().keys({
      orderId: Joi.number().min(1),
    });

    return await schema.validateAsync({ orderId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getDetail(req, res) {
  const { orderId } = req.params;

  await validation({ orderId });

  const product = await orderService.getDetail({ orderId });

  return res.status(200).send(product);
}

module.exports = getDetail;
