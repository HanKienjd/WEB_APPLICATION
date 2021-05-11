const { PolicyRole } = require('../../models');

const checkPermission = (permissions) => async (req, res, next) => {
  const userRole = req.user.role_id;
  const policyRoleObjects = await PolicyRole.query()
    .where('role_id', userRole)
    .withGraphFetched('policy')
    .modifyGraph('policy', (builder) => {
      builder.select('permission');
    });

  const userPermissions = policyRoleObjects.map((policyRole) => policyRole.policy.permission);
  if (permissions.filter((permission) => userPermissions.includes(permission)).length === 0) {
    return res.status(403).send({
      message: 'Forbidden',
    });
  }

  req.userPermissions = userPermissions;
  return next();
};

module.exports = checkPermission;
