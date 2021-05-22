const { Model } = require('objection');

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    const OrderDetail = require('./OrderDetail');

    return {
      orderDetail: {
        relation: Model.HasManyRelation,
        modelClass: OrderDetail,
        join: {
          from: 'orders.id',
          to: 'order_detail.order_id',
        },
      },
    };
  }
}

module.exports = Order;
