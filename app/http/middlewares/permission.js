const roleEnum = require('../../enums/Role');

const checkPermission = async (req, res, next) => {
  const userRole = req.user.role;

  if (userRole === roleEnum.USER) {
    return res.status(403).send({
      message: 'Forbidden',
    });
  }

  return next();
};

module.exports = checkPermission;
