exports.seed = async (knex) => {
  await knex('users').insert([{
    email: 'kienp544@gmail.com',
    full_name: 'Han',
    location_id: 1,
    role_id: 1,
    code: 'MI3000',
    status: 1,
    work_type: 1,
  }]);
};
