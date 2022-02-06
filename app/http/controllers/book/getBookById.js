const bookService = require('../../services/book');

async function getById(req, res) {
  const { bookId } = req.params;
  const book = await bookService.getBookById({ bookId });
  return res.status(200).send(book);
}

module.exports = getById;
