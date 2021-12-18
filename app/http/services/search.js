const { Book } = require('../../models/Book');

exports.search = async ({ query }) => {
  const books = await Book.query().where('name', 'like', `%${query}%`);
  return books;
};
