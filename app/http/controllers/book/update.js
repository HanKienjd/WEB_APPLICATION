const Joi = require('joi');

const bookService = require('../../services/book');
const { abort } = require('../../../helpers/error');

async function validation({ categoryId, name }) {
  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().integer().min(1),
    });

    return await schema.validateAsync({ categoryId, name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const { bookId } = req.params;
  const data = req.body;
  const imageBook = req.file.filename;

  await validation({ bookId });

  await bookService.update({ bookId, data, imageBook });

  return res.status(204).send();
}

module.exports = update;
