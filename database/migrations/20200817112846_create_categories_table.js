exports.up = async (knex) => {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 50).collate('utf8_general_ci').notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('name');

    table.index('name');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('categories');
};
