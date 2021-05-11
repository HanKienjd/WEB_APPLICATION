exports.up = async (knex) => {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id');
    table.string('name', 31).collate('latin1_general_ci').notNullable();

    table.timestamps(true, true);

    table.unique('name');
    table.index('name');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('roles');
};
