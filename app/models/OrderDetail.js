const { Model } = require('objection');

class OrderDetail extends Model {
  static get tableName() {
    return 'order_detail';
  }

  static get relationMappings() {
    const Book = require('./Book');

    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'order_detail.book_id',
          to: 'books.id',
        },
      },
    };
  }
}

module.exports = OrderDetail;
