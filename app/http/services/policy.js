const { Policy } = require('../../models');

exports.getAllPolicies = async () => {
  const policies = await Policy.query().select('id', 'permission');
  return { policies };
};
