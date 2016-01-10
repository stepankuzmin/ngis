
exports.seed = function seed(knex) {
  return knex('users').insert({
    email: 'admin@mystand.ru',
    encrypted_password: knex.raw("crypt('123qwe', gen_salt('md5'))")
  });
};
