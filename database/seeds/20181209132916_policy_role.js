exports.seed = async (knex) => {
  const policyRoles = [
    // SYSTEM ADMIN
    { policy_id: 1, role_id: 1 },
    { policy_id: 2, role_id: 1 },

    // EMPLOYEE
    { policy_id: 2, role_id: 2 },
  ];

  await knex('policy_role').insert(policyRoles);
};
