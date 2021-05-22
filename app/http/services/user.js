const {
  User,
} = require('../../models');

const { abort } = require('../../helpers/error');

exports.updateUser = async ({
  id,
  fullName,
  address,
  gender,
  dateOfBirth,
  userImg,
}) => {
  const user = await User.query().findOne({ id });

  if (!user) {
    return abort(400, 'User not found');
  }

  await User.query().findById(id).update({
    full_name: fullName,
    address,
    gender,
    date_of_birth: dateOfBirth,
    image: `${process.env.APP_URL_UPLOAD}/${userImg}`,
  });

  return '';
};

exports.getUsers = async ({
  page, limit, keyword,
}) => {
  const offset = page * limit - limit;

  const users = await User.query()
    .where('email', 'like', `%${keyword || ''}%`)
    .orWhere('full_name', 'like', `%${keyword || ''}%`)
    .limit(limit)
    .offset(offset);

  const [{ 'count(*)': total }] = await User.query()
    .where('email', 'like', `%${keyword || ''}%`)
    .orWhere('full_name', 'like', `%${keyword || ''}%`)
    .count();

  return {
    users,
    total,
  };
};
