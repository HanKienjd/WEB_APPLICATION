const Joi = require('joi');

const authService = require('../../services/auth');

const validate = async ({ email, code }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      code: Joi.number().required(),
    });

    return await schema.validate({ email, code });
  } catch (error) {
    return error;
  }
};

const sendCode = async (req, res) => {
  const { email, code } = req.body;
  await validate({ email, code });

  await authService.verifyCode({ email, code });
  res.sendStatus(200);
};

module.exports = sendCode;
