exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 127).collate('latin1_general_ci').notNullable();
    table.string('code', 31).collate('latin1_general_ci').notNullable();
    table.string('full_name', 127).collate('utf8_general_ci').notNullable();
    table.tinyint('work_type', 1).unsigned().notNullable();
    table.date('from_at');
    table.date('to_at');
    table.tinyint('status', 1).unsigned().notNullable();

    table.integer('role_id', 1).unsigned().references('roles.id').notNullable();
    table.integer('location_id').unsigned().references('locations.id').notNullable();

    table.timestamps(true, true);

    table.index('role_id');
    table.index('location_id');

    table.unique('email');
    table.unique('code');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
