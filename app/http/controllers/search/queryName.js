const searchService = require('../../services/search');

async function search(req, res) {
  const { query } = req.query;

  const books = await searchService.search({ query });

  return res.status(200).send(books);
}
module.exports = search;
