const { Model } = require('objection');

class Order extends Model {
  static get tableName() {
    return 'orders';
  }
}

module.exports = Order;
