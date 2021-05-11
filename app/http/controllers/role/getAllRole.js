const roleService = require('../../services/role');

async function getAllRole(req, res) {
  const responseData = await roleService.getAllRole();

  return res.status(200).send(responseData);
}

module.exports = getAllRole;
