module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'ngis'
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
