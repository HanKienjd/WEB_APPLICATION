exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 127).collate('latin1_general_ci').notNullable();
    table.string('full_name', 50).collate('utf8_general_ci').notNullable();
    table.string('username', 20).collate('latin1_general_ci').notNullable();
    table.string('password', 20).collate('latin1_general_ci').notNullable();
    table.string('address', 127).collate('utf8_general_ci').notNullable();
    table.string('gender', 3).collate('utf8_general_ci').notNullable();
    table.date('date_of_birth');
    table.string('image', 120).collate('latin1_general_ci').notNullable();
    table.integer('role', 1).unsigned().notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('email');
    table.unique('username');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
