const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');
const genderType = require('../../../enums/Gender');

async function validation(userInformation) {
  try {
    const schema = Joi.object().keys({
      fullName: Joi.string().max(127),
      address: Joi.string(),
      gender: Joi.valid(...genderType.getValues()),
      dateOfBirth: Joi.date(),
    });
    return await schema.validateAsync(userInformation);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function updateUser(req, res) {
  const { id } = req.user;
  const {
    fullName,
    address,
    gender,
    dateOfBirth,
  } = req.body;

  const userInformation = {
    fullName,
    address,
    gender: Number(gender),
    dateOfBirth,
  };

  const userImg = req.file.filename;

  await validation(userInformation);

  await userService.updateUser({ ...userInformation, userImg, id });
  return res.status(204).send();
}

module.exports = updateUser;
