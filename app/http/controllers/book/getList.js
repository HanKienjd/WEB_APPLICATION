const bookService = require('../../services/book');

async function getList(req, res) {
  const { categoryId } = req.query;
  const book = await bookService.getList({ categoryId });

  return res.status(200).send(book);
}

module.exports = getList;
