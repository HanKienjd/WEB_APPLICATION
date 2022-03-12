const { Book } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({
  name, categoryId, quantity, yearRelease, author, bookImg, publisher, note,
}) => {
  const book = await Book.query().findOne({
    name,
  });

  if (book) return abort(400, 'This book is already exits');

  await Book.query().insert({
    name, categoryId, quantity, yearRelease, author, image: bookImg, publisher, note,
  });

  return '';
};

exports.update = async ({ bookId, data, imageBook }) => {
  const book = await Book.query().findOne(data.name);

  if (book && book.id === bookId) return abort(400, 'This book is already exits');

  await Book.query().findById(bookId).update({
    name: data.name, categoryId: data.categoryId, quantity: data.quantity, yearRelease: data.yearRelease, author: data.author, image: imageBook, publisher: data.publisher, note: data.note,
  });

  return '';
};

exports.getList = ({ categoryId }) => {
  const books = Book.query().select('id', 'name', 'quantity', 'author', 'categoryId', 'image', 'yearRelease', 'publisher', 'note');
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
