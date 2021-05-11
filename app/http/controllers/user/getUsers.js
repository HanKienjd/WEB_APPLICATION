const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');
const workType = require('../../../enums/workType');
const userStatus = require('../../../enums/userStatus');

async function validation(searchInformation) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(0).required(),
      offset: Joi.number().integer().min(0).required(),
      keyword: Joi.string().allow(''),
      workType: Joi.number().valid(...workType.getValues()),
      roleId: Joi.number().integer().min(1),
      positionId: Joi.number().integer().min(1),
      departmentId: Joi.number().integer().min(1),
      status: Joi.number().valid(...userStatus.getValues()),
      fromDate: Joi.date().allow(''),
      toDate: Joi.date().allow(''),
      sortBy: Joi.valid(...['email', 'id', 'full_name']),
      sortType: Joi.valid(...['desc', 'asc']),
    });

    return await schema.validateAsync(searchInformation);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getUsers(req, res) {
  const searchInformation = {
    limit: req.query.limit,
    offset: req.query.offset,
    keyword: req.query.keyword,
    workType: req.query.workType,
    roleId: req.query.roleId,
    positionId: req.query.positionId,
    departmentId: req.query.departmentId,
    status: req.query.status,
    fromDate: req.query.fromDate,
    toDate: req.query.toDate,
    sortBy: req.query.sortBy,
    sortType: req.query.sortType,
  };

  await validation(searchInformation);

  const responseData = await userService.getUsers(searchInformation);
  return res.status(200).send(responseData);
}

module.exports = getUsers;
