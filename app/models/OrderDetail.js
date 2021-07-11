const { Model } = require('objection');

class OrderDetail extends Model {
  static get tableName() {
    return 'order_detail';
  }

  static get relationMappings() {
    const Product = require('./Product');

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'order_detail.product_id',
          to: 'products.id',
        },
      },
    };
  }
}

module.exports = OrderDetail;
