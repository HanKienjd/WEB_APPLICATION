const { Product, Advertisement } = require('../../models');

const { abort } = require('../../helpers/error.js');

exports.create = async ({
  productId,
  content,
  advertisementImg,
}) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'This product is not already exits');

  await Advertisement.query().insert({
    content,
    product_id: productId,
    image: `${process.env.APP_URL_UPLOAD}/${advertisementImg}`,
  });

  return '';
};

exports.getList = async ({ limit, page }) => {
  const offset = page * limit - limit;

  const advertisements = await Advertisement.query().offset(offset).limit(limit);

  const [{ 'count(*)': total }] = await Product.query().count();

  return { advertisements, total };
};

exports.update = async ({
  advertisementId,
  productId,
  content,
  advertisementImg,
}) => {
  const advertisement = await Advertisement.query().findById(advertisementId);

  if (!advertisement) return abort(400, 'This advertisement is not already exits');

  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'This product is not already exits');

  await Advertisement.query()
    .findById(advertisementId)
    .update({
      content,
      product_id: productId,
      image: `${process.env.APP_URL_UPLOAD}/${advertisementImg}`,
    });

  return '';
};

exports.remove = async ({ advertisementId }) => {
  const advertisement = await Product.query().findById(advertisementId);

  if (!advertisement) return abort(400, 'Product is not already exists');

  await Advertisement.query().findById(advertisementId).delete();

  return '';
};
