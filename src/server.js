/* @flow */

import cors from 'kcors';
import Koa from 'koa';
import morgan from 'koa-morgan';
import serve from 'koa-static';
import path from 'path';
import router from './router.js';
import type { ServerConfigType } from './types.js';

export default function (config: ServerConfigType) {
  const app = new Koa();

  app.use(serve(path.join(__dirname, '/../assets')));
  app.use(morgan('dev'));
  if (config.cors) app.use(cors());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.body = { message: error.message };
      ctx.status = error.status || 500;
    }
  });

  app.use(async (ctx, next) => {
    ctx.knex = config.knex;
    await next();
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
