const Joi = require('joi');

const bookServices = require('../../services/book');
const { abort } = require('../../../helpers/error');

async function validation({ name }) {
  try {
    const schema = Joi.object().keys({
      name: Joi.string(),
    });

    return await schema.validateAsync({ name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}
async function create(req, res) {
  const {
    name, author, yearRelease, quantity, categoryId,
  } = req.body;

  const bookImg = req.file.filename;
  const bookInformation = {
    name,
    author,
    yearRelease,
    quantity,
    categoryId,
    bookImg,
  };
  await validation(name);

  await bookServices.create(bookInformation);

  return res.status(201).send();
}
module.exports = create;
