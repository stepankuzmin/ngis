import koa from 'koa'
import jade from 'jade'
import morgan from 'koa-morgan'
import { setupWebpack } from './webpack'

var app = koa()
if (process.env.NODE_ENV == 'development') {
  setupWebpack(app)
}
app.use(morgan.middleware('dev'))

var template = jade.compileFile('./src/shared/index.jade')
app.use(function *() {
  var html = template({ state: {} })
  this.body = html
})

var server = app.listen(4000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('📡  ON AIR @ %s:%s', host, port)
})

// Catch SIGINT (Ctrl+C) to exit process
process.on('SIGINT', function () {
  console.warn('Caught SIGINT, terminating')
  server.close()
  process.exit()
})