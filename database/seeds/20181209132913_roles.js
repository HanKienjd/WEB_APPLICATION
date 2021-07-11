exports.seed = async (knex) => {
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Employee' },
  ];

  await knex('roles').insert(roles);
};
