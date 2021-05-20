exports.up = async (knex) => {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 50).collate('utf8_general_ci').notNullable();
    table.string('status', 50).collate('utf8_general_ci').notNullable();
    table.integer('buying_price').unsigned().notNullable();
    table.integer('selling_price').unsigned().notNullable();
    table.integer('quantity').unsigned().notNullable();
    table.string('description', 120).collate('utf8_general_ci').notNullable();
    table.string('image', 120).collate('latin1_general_ci').notNullable();

    table.integer('category_id').unsigned().references('categories.id').notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('name');
    table.unique('description');
    table.unique('image');

    table.index('category_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
};
