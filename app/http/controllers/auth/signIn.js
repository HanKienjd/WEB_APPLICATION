const Joi = require('joi');
const authService = require('../../services/auth');
const { abort } = require('../../../helpers/error');

async function validation(args) {
  try {
    const schema = Joi.object().keys({
      providerAccessToken: Joi.string().required(),
      providerName: Joi.valid(...['MICROSOFT', 'GOOGLE']),
    });
    const params = {
      providerAccessToken: args.providerAccessToken,
      providerName: args.providerName,
    };
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function signIn(req, res) {
  await validation(req.body);
  const credentials = {
    providerName: req.body.providerName,
    providerAccessToken: req.body.providerAccessToken,
  };

  const responseData = await authService.signIn(credentials);
  return res.status(200).send(responseData);
}

module.exports = signIn;
