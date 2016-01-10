import jwt from 'koa-jwt';
import * as config from '../../shared/config.js';

export function* create() {
  this.checkBody('email').isEmail('Invalid email');
  this.checkBody('password').notEmpty('Empty password');

  // Validate params
  if (this.errors) {
    this.status = 400;
    this.body = this.errors;
    return;
  }

  const params = this.request.body;

  // fetch users
  const users = yield this.knex('users').where({
    email: params.email,
    encrypted_password: this.knex.raw(
      `crypt('${params.password}', encrypted_password)`
    )
  });

  if (users.length > 0) {
    let user = users[0];
    // sign token and populate this.state.currentUser
    let token = jwt.sign(user, config.SECRET);
    this.body = { token };
  } else {
    this.status = 401;
    this.body = 'Invalid credentials\n';
  }
}
