import koa from 'koa'
import jade from 'jade'
import cors from 'koa-cors'
import morgan from 'koa-morgan'
import { setupWebpack } from './webpack'

export default function (config = {}) {
  var app = koa()

  if (process.env.NODE_ENV == 'development') {
    setupWebpack(app)
  }

  if (config.cors) app.use(cors())
  app.use(morgan.middleware('dev'))

  var template = jade.compileFile('./src/shared/index.jade')
  app.use(function *() {
    var html = template({ state: {} })
    this.body = html
  })

  return app
}
