const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }
}

module.exports = Product;
