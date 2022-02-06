const { Model } = require('objection');

class VoucherDetail extends Model {
  static get tableName() {
    return 'voucher_detail';
  }

  static get relationMappings() {
    const Book = require('./Book');

    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'voucher_detail.book_id',
          to: 'book.id',
        },
      },
    };
  }
}

module.exports = VoucherDetail;
