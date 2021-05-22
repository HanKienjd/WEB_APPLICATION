// const Joi = require('joi');

// const userService = require('../../services/user');
// const { abort } = require('../../../helpers/error');

// async function validation(ids) {
//   try {
//     const id = Joi.number().integer().min(1).required();
//     const schema = Joi.object().keys({
//       ids: Joi.array().items(id).required(),
//     });

//     return await schema.validateAsync(ids);
//   } catch (error) {
//     return abort(400, 'Params error');
//   }
// }

// async function getList(req, res) {
//   const { ids } = req.query;
//   await validation({ ids });

//   const responseData = await userService.getList(ids);
//   return res.status(200).send(responseData);
// }

// module.exports = getList;
