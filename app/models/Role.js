const { Model } = require('objection');

class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    const PolicyRole = require('./PolicyRole');
    const User = require('./User');
    return {
      policyRoles: {
        relation: Model.HasManyRelation,
        modelClass: PolicyRole,
        join: {
          from: 'roles.id',
          to: 'policy_role.role_id',
        },
      },
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'roles.id',
          to: 'users.role_id',
        },
      },
    };
  }
}

module.exports = Role;
