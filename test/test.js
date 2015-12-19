import test from 'tape'
import request from 'supertest-koa-agent'
import server from '../src/server/server'

const app = server()

test('GET /', t => {
  request(app)
    .get('/')
    .expect(200)
    .end(function(error, result) {
      t.error(error, 'No errors')
      t.end()
    })
})