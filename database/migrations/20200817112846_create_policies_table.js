exports.up = async (knex) => {
  await knex.schema.createTable('policies', (table) => {
    table.increments('id');
    table.string('permission', 31).collate('latin1_general_ci').notNullable();

    table.timestamps(true, true);

    table.index('permission');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('policies');
};
