exports.seed = async (knex) => {
  const policies = [
    { id: 1, permission: 'manage users' },
    { id: 2, permission: 'access users' },
  ];

  await knex('policies').insert(policies);
};
