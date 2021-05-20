exports.up = async (knex) => {
  await knex.schema.createTable('order_detail', (table) => {
    table.increments('id').primary();
    table.integer('price').unsigned().notNullable();
    table.integer('quantity').unsigned().notNullable();

    table.integer('order_id').unsigned().references('orders.id').notNullable();
    table.integer('product_id').unsigned().references('products.id').notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.index('order_id');
    table.index('product_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('order_detail');
};
