// const Joi = require('joi');

// const userService = require('../../services/user');
// const userStatus = require('../../../enums/userStatus');
// const workType = require('../../../enums/workType');
// const { abort } = require('../../../helpers/error');

// async function validation(userInformation) {
//   try {
//     const schema = Joi.object().keys({
//       email: Joi.string().max(127).email().required(),
//       tel: Joi.string().pattern(/^\+?[0-9]*$/).max(20).allow(''),
//       fullName: Joi.string().max(127).required(),
//       code: Joi.string().max(31).required(),
//       locationId: Joi.number().integer().required(),
//       roleId: Joi.number().integer().required(),
//       positionId: Joi.number().integer().required(),
//       departmentIds: Joi.array().items(Joi.number().integer().required()).required(),
//       fromAt: Joi.date().required(),
//       toAt: Joi.date().allow(null),
//       status: Joi.valid(...userStatus.getValues()).required(),
//       workType: Joi.valid(...workType.getValues()).required(),
//       skill: Joi.string().max(255).allow(''),
//     });
//     return await schema.validateAsync(userInformation);
//   } catch (error) {
//     return abort(400, 'Params error');
//   }
// }

// async function addUser(req, res) {
//   const userInformation = {
//     email: req.body.email,
//     tel: req.body.tel,
//     fullName: req.body.fullName,
//     code: req.body.code,
//     locationId: req.body.locationId,
//     roleId: req.body.roleId,
//     positionId: req.body.positionId,
//     departmentIds: req.body.departmentIds,
//     fromAt: req.body.fromAt,
//     toAt: req.body.toAt,
//     status: req.body.status,
//     workType: req.body.workType,
//     skill: req.body.skill,
//   };

//   await validation(userInformation);

//   await userService.addUser(userInformation);
//   return res.status(201).send();
// }

// module.exports = addUser;
