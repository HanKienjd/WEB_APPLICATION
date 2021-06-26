exports.up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.datetime('code_time').nullable().after('code');
  });
};

exports.down = function () {

};
