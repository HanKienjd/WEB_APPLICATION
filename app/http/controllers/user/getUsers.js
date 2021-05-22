const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');

async function validation(searchInformation) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(0).required(),
      page: Joi.number().integer().min(0).required(),
      keyword: Joi.string().allow(''),
    });

    return await schema.validateAsync(searchInformation);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getUsers(req, res) {
  const searchInformation = {
    limit: req.query.limit,
    page: req.query.page,
    keyword: req.query.keyword,
  };

  await validation(searchInformation);

  const responseData = await userService.getUsers(searchInformation);
  return res.status(200).send(responseData);
}

module.exports = getUsers;
