import jwt from 'koa-jwt';
import * as config from '../../shared/config.js';

export function* create() {
  this.checkBody('email').isEmail('Invalid email');
  this.checkBody('password').notEmpty('Empty password');

  if (this.errors) {
    this.status = 400;
    this.body = this.errors;
    return;
  }

  // sign token and populate this.state.currentUser
  let user = { email: 'to.stepan.kuzmin@gmail.com' };
  let token = jwt.sign(user, config.SECRET);
  this.body = { token };
}
