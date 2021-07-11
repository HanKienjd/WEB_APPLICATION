const { Product, Category } = require('../../models');

const { abort } = require('../../helpers/error');

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

exports.getList = async ({ limit, page, categoryIds }) => {
  const offset = page * limit - limit;

  let products = Product.query()
    .offset(offset).limit(limit);

  let total = Product.query().count();

  if (categoryIds && categoryIds.length) {
    products.whereIn('category_id', categoryIds);
    total.whereIn('category_id', categoryIds);
  }

  products = await products;
  [{ 'count(*)': total }] = await total;

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
