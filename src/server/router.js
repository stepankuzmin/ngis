import jwt from 'koa-jwt';
import mount from 'koa-mount';
import Router from 'koa-router';
import compose from 'koa-compose';

import * as config from '../shared/config.js';
import * as users from './controllers/users.js';
import * as sessions from './controllers/sessions.js';

let publicRouter = new Router();
publicRouter.post('/sessions/create', sessions.create);

let privateRouter = new Router();
privateRouter.get('/users', users.index);

// Attempt to go through the JWT Validator
function* tokenValidator(next) {
  try {
    yield next;
  } catch (error) {
    if (error.status === 401) {
      this.status = error.status;
      this.body = 'Unauthorized\n';
    } else {
      // Pass the error to the next handler since it wasn't a JWT error
      throw error;
    }
  }
}

export default compose([
  publicRouter.middleware(),
  mount('/api', compose([
    tokenValidator,
    jwt({
      key: 'currentUser',
      secret: config.SECRET
    }),
    privateRouter.middleware()
  ]))
]);
