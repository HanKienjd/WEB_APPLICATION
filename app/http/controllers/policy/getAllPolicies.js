const roleService = require('../../services/policy');

async function getAllPolicies(req, res) {
  const responseData = await roleService.getAllPolicies();
  return res.status(200).send(responseData);
}

module.exports = getAllPolicies;
