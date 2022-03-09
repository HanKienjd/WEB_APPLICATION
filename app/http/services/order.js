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
    return abort(500, 'Something went wrong');
  }

  return '';
};

exports.getList = async ({ limit, page, userId }) => {
  const offset = limit * page - limit;
  let orders;
  if (userId) {
    orders = await Order.query()
      .where('user_id', userId)
      .select('*')
      .limit(limit)
      .offset(offset);
  } else {
    orders = await Order.query()
      .select('*')
      .limit(limit)
      .offset(offset);
  }

  const [{ 'count(*)': total }] = await Order.query().count();

  return { orders, total };
};

exports.getDetail = async ({ orderId }) => {
  const orderDetail = await Order.query()
    .findOne({
      id: orderId,
    })
    .select('id', 'start_date', 'status', 'user_id', 'code', 'end_date', 'approval')
    .withGraphFetched('orderDetail', (builder) => {
      builder.select('id', 'book_id', 'quantity');
    })
    .withGraphFetched('orderDetail.book', (builder) => {
      builder.select('id', 'name', 'image');
    });

  return orderDetail;
};
