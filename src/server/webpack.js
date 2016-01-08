import webpack from 'webpack';
import config from '../../webpack.config.development';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';

export default function (app) {
  const compiler = webpack(config);
  app.use(webpackHotMiddleware(compiler));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
      colors: true
    },
    publicPath: config.output.publicPath
  }));

  return app;
}
