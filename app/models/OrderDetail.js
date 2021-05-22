const { Model } = require('objection');

class OrderDetail extends Model {
  static get tableName() {
    return 'order_detail';
  }
}

module.exports = OrderDetail;
