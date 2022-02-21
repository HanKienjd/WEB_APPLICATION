const { Book } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({
  name, categoryId, quantity, yearRelease, author, bookImg,
}) => {
  const book = await Book.query().findOne({
    name,
  });

  if (book) return abort(400, 'This book is already exits');

  await Book.query().insert({
    name, categoryId, quantity, yearRelease, author, image: `${process.env.APP_URL_UPLOAD}/${bookImg}`,
  });

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

exports.getList = ({ categoryId }) => {
  const books = Book.query().select('id', 'name', 'quantity', 'author', 'categoryId', 'image', 'yearRelease');
  // get list book by category
  if (categoryId && categoryId.length > 0) {
    books.where('category_id', categoryId);
  }
  return books;
};

exports.remove = async ({ bookId }) => {
  const book = await Book.query().findById(bookId);

  if (!book) return abort(400, 'This book is not already exists');

  await Book.query().findById(bookId).delete();

  return { message: 'Delete book successfully' };
};

exports.getBookById = async ({ bookId }) => {
  const book = await Book.query().findById(bookId);

  if (!book) return abort(400, 'This book is not already exists');

  return book;
};
