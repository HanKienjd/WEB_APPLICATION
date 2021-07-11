exports.up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.string('code', 8).nullable().after('image');
  });
};

exports.down = function () {

};
