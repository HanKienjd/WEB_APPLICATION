const { transaction } = require('objection');
const dayjs = require('dayjs');

const { Order } = require('../../models');
const { abort } = require('../../helpers/error.js');

exports.create = async ({ orderDetail, userId }) => {
  const order = {
    start_date: dayjs().format('YYYY-MM-DD'),
    status: 0,
    user_id: userId,
    orderDetail: orderDetail.map((element) => ({
      book_id: element.book_id,
      quantity: element.quantity,
    })),
  };

  try {
    await transaction(Order, async (OrderTrx) => {
      await OrderTrx.query().upsertGraph(order);
    });
  } catch (e) {
    console.log('🚀 ~ file: order.js ~ line 24 ~ exports.create= ~ e', e);
    return abort(500, 'Something went wrong');
  }

  return '';
};

exports.getList = async ({ limit, page, userId }) => {
  const offset = limit * page - limit;

  const orders = await Order.query()
    .where('user_id', userId)
    .select('id', 'buy_date')
    .limit(limit)
    .offset(offset);

  const [{ 'count(*)': total }] = await Order.query().count();

  return { orders, total };
};

exports.getDetail = async ({ orderId, userId }) => {
  const orderDetail = await Order.query()
    .findOne({
      id: orderId,
      user_id: userId,
    })
    .select('id', 'buy_date')
    .withGraphFetched('orderDetail', (builder) => {
      builder.select('id', 'product_id', 'quantity', 'price');
    })
    .withGraphFetched('orderDetail.product', (builder) => {
      builder.select('id', 'name', 'image');
    });

  return orderDetail;
};
