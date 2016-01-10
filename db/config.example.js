module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      database: 'ngis_test'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'ngis_development'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'ngis_production'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
