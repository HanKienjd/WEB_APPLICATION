const bookService = require('../../services/book');

async function getList(req, res) {
  const book = await bookService.getList();

  return res.status(200).send(book);
}

module.exports = getList;
