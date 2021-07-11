const { Model } = require('objection');

class Advertisement extends Model {
  static get tableName() {
    return 'advertisements';
  }
}

module.exports = Advertisement;
