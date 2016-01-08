import jwt from 'koa-jwt';
import * as config from '../../shared/config.js';

export function* create() {
  // sign token and populate this.state.currentUser
  let user = { email: 'to.stepan.kuzmin@gmail.com' };
  let token = jwt.sign(user, config.SECRET);
  this.body = { token };
}
