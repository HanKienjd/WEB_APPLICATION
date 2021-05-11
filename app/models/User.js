const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async hasEmail(email) {
    const user = await this.query().findOne({ email });
    if (user) return true;
    return false;
  }

  static async hasCode(code) {
    const user = await this.query().findOne({ code });
    if (user) return true;
    return false;
  }

  static async canUpdateEmail(email, id) {
    const user = await this.query().findOne({ email });
    if (!user) return true;
    return user.id === id;
  }

  static async canUpdateCode(code, id) {
    const user = await this.query().findOne({ code });
    if (!user) return true;
    return user.id === id;
  }

  static get relationMappings() {
    const Role = require('./Role');

    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
    };
  }
}

module.exports = User;
