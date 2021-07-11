const Joi = require('joi');

const categoryService = require('../../services/category');
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
  const { name } = req.body;

  await validation({ name });

  await categoryService.create({ name });

  return res.status(201).send();
}

module.exports = create;
