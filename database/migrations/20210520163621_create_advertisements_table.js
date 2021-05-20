exports.up = async (knex) => {
  await knex.schema.createTable('advertisements', (table) => {
    table.increments('id').primary();
    table.string('content', 100).collate('utf8_general_ci').notNullable();
    table.string('image', 120).collate('latin1_general_ci').notNullable();

    table.integer('product_id').unsigned().references('products.id').notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('product_id');

    table.index('product_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('advertisements');
};
