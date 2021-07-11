const Joi = require('joi');

const authService = require('../../services/auth');

const validate = async ({ email }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    return await schema.validate({ email });
  } catch (error) {
    return error;
  }
};

const sendCode = async (req, res) => {
  const { email } = req.body;
  await validate({ email });

  await authService.sendCode({ email });
  res.sendStatus(200);
};

module.exports = sendCode;
