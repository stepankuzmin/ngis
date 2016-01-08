import koa from 'koa';
import jade from 'jade';
import path from 'path';
import cors from 'koa-cors';
import morgan from 'koa-morgan';
import router from './router.js';
import webpack from './webpack';
import favicon from 'koa-favicon';
import bodyParser from 'koa-bodyparser';

const faviconPath = path.join(__dirname, '../shared/favicon.ico');
const templatePath = path.join(__dirname, '../shared/index.jade');
const template = jade.compileFile(templatePath);

export default function (config = {}) {
  let app = koa();

  if (process.env.NODE_ENV === 'development') {
    webpack(app);
  }

  if (config.cors) app.use(cors());
  app.use(morgan.middleware('dev'));
  app.use(favicon(faviconPath));
  app.use(bodyParser());

  app.use(router);

  app.use(function* render() {
    let html = template({ state: {} });
    this.body = html;
  });

  return app;
}
