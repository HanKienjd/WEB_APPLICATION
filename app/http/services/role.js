const { intersection } = require('lodash');
const { transaction } = require('objection');

const { abort } = require('../../helpers/error');
const { Role, Policy, PolicyRole } = require('../../models');

exports.getAllRole = async () => {
  const roles = await Role.query()
    .select('id', 'name')
    .orderBy('id', 'asc')
    .withGraphFetched('policyRoles')
    .modifyGraph('policyRoles', (builder) => {
      builder.select('');
    })
    .withGraphFetched('policyRoles.policy')
    .modifyGraph('policyRoles.policy', (builder) => {
      builder.select('id', 'permission');
    });

  return { roles };
};

exports.addRole = async ({ name, policies }) => {
  const role = await Role.query().findOne({ name });

  if (role) return abort(400, 'Role is already exists');

  const policiesList = await Policy.query().select('id');

  if (intersection(policiesList.map((policy) => policy.id), policies).length !== policies.length) {
    return abort(400, 'Params Error');
  }

  try {
    await transaction(Role, async (RoleTrx) => {
      await RoleTrx.query().insertGraph({
        name,
        policyRoles: policies.map((policy) => ({
          policy_id: policy,
        })),
      });
    });
  } catch (e) {
    return abort(400, 'Add Role Error');
  }

  return '';
};

exports.updateRole = async ({ roleId, name, policies }) => {
  const role = await Role.query().findOne({ name });

  if (role && role.id !== Number(roleId)) return abort(400, 'Role is already exists');

  const policiesList = await Policy.query().select('id');

  if (intersection(policiesList.map((policy) => policy.id), policies).length !== policies.length) {
    return abort(400, 'Params Error');
  }

  try {
    await transaction(Role, async (RoleTrx) => {
      await RoleTrx.query().upsertGraph({
        id: roleId,
        name,
        policyRoles: policies.map((policy) => ({
          policy_id: policy,
        })),
      });
    });
  } catch (e) {
    return abort(400, 'Updated Role Error');
  }

  return '';
};

exports.removeRole = async ({ roleId }) => {
  const role = await Role.query()
    .findOne({ id: roleId })
    .withGraphFetched('users')
    .modifyGraph('users', (builder) => {
      builder.select('id').first();
    });

  if (!role) return abort(400, 'Role is not exists');
  if (role && role.users.length !== 0) return abort(400, 'Role has already used');

  try {
    await transaction(PolicyRole, Role, async (PolicyRoleTrx, RoleTrx) => {
      await PolicyRoleTrx.query()
        .where({
          role_id: roleId,
        })
        .delete();

      await RoleTrx.query().deleteById(roleId);
    });
  } catch (e) {
    return abort(400, 'Remove Role Error');
  }

  return '';
};
