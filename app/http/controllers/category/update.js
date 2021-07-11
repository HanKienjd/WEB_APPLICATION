const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');

async function validation({ categoryId, name }) {
  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().integer().min(1),
      name: Joi.string(),
    });

    return await schema.validateAsync({ categoryId, name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const { categoryId } = req.params;
  const { name } = req.body;

  await validation({ categoryId, name });

  await categoryService.update({ categoryId, name });

  return res.status(204).send();
}

module.exports = update;
