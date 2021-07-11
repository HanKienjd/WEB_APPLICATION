exports.up = async (knex) => {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.date('buy_date').notNullable();
    table.string('status', 50).collate('utf8_general_ci').notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.integer('user_id').unsigned().references('users.id').notNullable();

    table.index('user_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('orders');
};
