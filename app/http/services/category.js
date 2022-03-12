const { Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({ name, imgCategory }) => {
  const category = await Category.query().findOne({
    name,
  });

  if (category) return abort(400, 'This category is already exits');

  await Category.query().insert({ name, image: imgCategory });

  return '';
};

exports.update = async ({ categoryId, name, imgCategory }) => {
  const category = await Category.query().findOne({
    name,
  });

  if (category && category.id === categoryId) return abort(400, 'This category is already exits');

  await Category.query().findById(categoryId).update({ name, image: imgCategory });

  return '';
};

exports.getList = () => {
  const categories = Category.query().select('id', 'name', 'image');

  return categories;
};

exports.remove = async ({ categoryId }) => {
  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exists');

  await Category.query().findById(categoryId).delete();

  return '';
};
