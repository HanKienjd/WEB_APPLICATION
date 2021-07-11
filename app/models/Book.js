const { Model } = require('objection');

class Book extends Model {
  static get tableName() {
    return 'Book';
  }
}

module.exports = Book;
