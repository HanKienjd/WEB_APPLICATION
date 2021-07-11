const bcrypt = require('bcrypt');
const { generate } = require('../../helpers/jwt');

const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const roleEnum = require('../../enums/Role');
const { sendEmail } = require('../../helpers/mailer');
const { randomCode } = require('../../helpers/utils');

exports.signIn = async ({ email, password }) => {
  const user = await User.query()
    .findOne('email', email);
  if (!user || !(await bcrypt.compare(password, user.password))) return abort(400, 'email or password is incorrect');
  const accessToken = await generate({ userId: user.id });
  return { accessToken };
};

exports.signUp = async ({
  email,
  password,
}) => {
  const findUser = await User.query().findOne({
    email,
  });

  if (findUser) return abort(400, 'Email is already exist');

  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.query()
    .insert({
      email,
      password: hashPassword,
      role: roleEnum.USER,
    });

  const result = {
    id: user.id,
    email: user.email,
  };

  return result;
};

exports.me = (req) => {
  const { user } = req;

  delete user.password;

  return user;
};

exports.sendCode = async ({ email }) => {
  const user = await User.query().findOne({ email });
  const code = randomCode();

  if (!user) abort(400, 'User is not found');

  await sendEmail({
    subject: 'Forgot Password',
    text: `code verify is ${code}`,
    to: email,
    from: process.env.EMAIL,
  });

  await user.$query().update({
    code,
    code_time: new Date(),
  });
};

exports.verifyCode = async ({ email, code }) => {
  const user = await User.query().findOne({ email });
  if (!user) abort(400, 'User is not found');

  if (new Date().getTime() > new Date(user.code_time).getTime() + 60 * 60 * 1000) abort(400, 'Code is expired');
  if (code !== user.code) abort(400, 'Code is not valid');
};

exports.forgotPass = async ({ email, code, password }) => {
  const user = await User.query().findOne({ email });
  if (!user) abort(400, 'User is not found');

  if (new Date().getTime() > new Date(user.code_time).getTime() + 60 * 60 * 1000) abort(400, 'Code is expired');
  if (code !== user.code) abort(400, 'Code is not valid');

  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashPassword = await bcrypt.hash(password, salt);

  await user.$query().update({
    code: null,
    code_time: null,
    password: hashPassword,
  });
};
