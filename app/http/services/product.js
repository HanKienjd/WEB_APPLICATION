const { Product, Category } = require('../../models');

const { abort } = require('../../helpers/error.js');

exports.create = async ({
  name,
  status,
  buyingPrice,
  sellingPrice,
  quantity,
  description,
  categoryId,
  productImg,
}) => {
  const product = await Product.query().findOne({
    name,
  });

  if (product) return abort(400, 'This product is already exits');

  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query().insert({
    name,
    status,
    buying_price: buyingPrice,
    selling_price: sellingPrice,
    quantity,
    description,
    category_id: categoryId,
    image: `${process.env.APP_URL_UPLOAD}/${productImg}`,
  });

  return '';
};

exports.getList = async ({ limit, page }) => {
  const offset = page * limit - limit;

  const products = await Product.query().offset(offset).limit(limit);

  const [{ 'count(*)': total }] = await Product.query().count();

  return { products, total };
};

exports.getDetail = async ({ productId }) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'Product is not already exists');

  return product;
};

exports.update = async ({
  productId,
  name,
  status,
  buyingPrice,
  sellingPrice,
  quantity,
  description,
  categoryId,
  productImg,
}) => {
  const product = await Product.query().findOne({
    name,
  });

  if (product && product.id === productId) return abort(400, 'This product is already exits');

  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query().findById(productId).update({
    name,
    status,
    buying_price: buyingPrice,
    selling_price: sellingPrice,
    quantity,
    description,
    category_id: categoryId,
    image: `${process.env.APP_URL_UPLOAD}/${productImg}`,
  });

  return '';
};

exports.remove = async ({ productId }) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'Product is not already exists');

  await Product.query().findById(productId).delete();

  return '';
};
