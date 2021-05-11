exports.up = async (knex) => {
  await knex.schema.createTable('policy_role', (table) => {
    table.increments('id');
    table.integer('role_id').unsigned().references('roles.id').notNullable();
    table.integer('policy_id').unsigned().references('policies.id').notNullable();

    table.timestamps(true, true);

    table.index('role_id');
    table.index(['policy_id', 'role_id']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('policy_role');
};
