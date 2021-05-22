const bcrypt = require('bcrypt');
const { generate } = require('../../helpers/jwt');

const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const roleEnum = require('../../enums/Role');

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
