const dayjs = require('dayjs');
const { Voucher } = require('../../models/Voucher');
const { VoucherDetail } = require('../../models/VoucherDetail');
const { abort } = require('../../helpers/error');
const { Book } = require('../../models/Book');

exports.create = async ({ voucherDetail, userId }) => {
  const voucher = {
    user_id: userId,
    status: 0,
    date_at: dayjs().format('YYYY-MM-DD'),
    voucherDetail: voucherDetail.map((element) => ({
      book_id: element.bookId,
      quantity: element.quantity,
    })),
  };
  try {
    await Voucher.query().upsertGraph(voucher);
  } catch (err) {
    return abort(500, 'Something went wrong');
  }
  return '';
};
