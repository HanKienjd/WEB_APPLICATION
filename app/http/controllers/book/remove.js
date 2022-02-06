const Joi = require('joi');

const bookService = require('../../services/book');
const { abort } = require('../../../helpers/error');

async function validation({ bookId }) {
  try {
    const schema = Joi.object().keys({
      bookId: Joi.number().integer().min(1),
    });

    return await schema.validateAsync({ bookId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function remove(req, res) {
  const { bookId } = req.params;

  await validation({ bookId });

  const message = await bookService.remove({ bookId });

  return res.status(204).send(message);
}

module.exports = remove;
