const { Model } = require('objection');
const Policy = require('./Policy');

class PolicyRole extends Model {
  static get tableName() {
    return 'policy_role';
  }

  static get relationMappings() {
    return {
      policy: {
        relation: Model.BelongsToOneRelation,
        modelClass: Policy,
        join: {
          from: 'policy_role.policy_id',
          to: 'policies.id',
        },
      },
    };
  }
}

module.exports = PolicyRole;
