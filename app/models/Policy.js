const { Model } = require('objection');

class Policy extends Model {
  static get tableName() {
    return 'policies';
  }
}

module.exports = Policy;
