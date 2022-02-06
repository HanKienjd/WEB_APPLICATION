const { Model } = require('objection');

class Voucher extends Model {
  static get tableName() {
    return 'voucher';
  }

  static get relationMappings() {
    const VoucherDetail = require('./VoucherDetail');

    return {
      voucherDetail: {
        relation: Model.HasManyRelation,
        modelClass: VoucherDetail,
        join: {
          from: 'voucher.id',
          to: 'voucher_detail.voucher_id',
        },
      },
    };
  }
}

module.exports = Voucher;
