/* @flow */

import Router from 'koa-router';
import * as api from './controllers/api.js';

const router = new Router();
router.get('/api/:layer_key.geojson', api.index);

export default router;
