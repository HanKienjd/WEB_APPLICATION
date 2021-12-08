const { Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({ name }) => {
  const category = await Category.query().findOne({
    name,
  });

  if (category) return abort(400, 'This category is already exits');

  await Category.query().insert({ name });

  return '';
};

exports.update = async ({ categoryId, name }) => {
  const category = await Category.query().findOne({
    name,
  });

  if (category && category.id === categoryId) return abort(400, 'This category is already exits');

  await Category.query().findById(categoryId).update({ name });

  return '';
};

exports.getList = () => {
  const categories = Category.query().select('id', 'name', 'quantity', 'image');

  return categories;
};

exports.remove = async ({ categoryId }) => {
  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exists');

  await Category.query().findById(categoryId).delete();

  return '';
};
