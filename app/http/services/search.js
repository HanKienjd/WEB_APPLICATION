const { Book, Category } = require('../../models');

exports.search = async ({ query }) => {
  const data = [];
  const books = await Book.query().where('name', 'like', `%${query}%`);
  const categories = await Category.query().where('name', 'like', `%${query}%`);
  return data.concat(books, categories);
};
