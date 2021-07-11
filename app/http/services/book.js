const { Book } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({ name }) => {
  const book = await Book.query().findOne({
    name,
  });

  if (book) return abort(400, 'This book is already exits');

  await Book.query().insert({ name });

  return '';
};

exports.update = async ({ bookId, name }) => {
  const book = await Book.query().findOne({
    name,
  });

  if (book && book.id === bookId) return abort(400, 'This book is already exits');

  await Book.query().findById(bookId).update({ name });

  return '';
};

exports.getList = () => {
  const books = Book.query().select('id', 'name', 'quantity', 'author', 'category_id', 'image', 'year_release');

  return books;
};

exports.remove = async ({ id }) => {
  const book = await Book.query().findById(id);

  if (!book) return abort(400, 'This book is not already exists');

  await Book.query().findById(id).delete();

  return '';
};
