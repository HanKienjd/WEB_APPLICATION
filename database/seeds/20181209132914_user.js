exports.seed = async (knex) => {
  await knex('users').insert([{
    email: 'hoan.nguyenduy@amela.vn',
    full_name: 'Nguyen Duy Hoan',
    location_id: 1,
    role_id: 1,
    code: 'MI3000',
    status: 1,
    work_type: 1,
  }]);
};
