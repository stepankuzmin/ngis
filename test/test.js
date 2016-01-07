import test from 'tape';
import server from '../src/server/server';
import request from 'supertest-koa-agent';

const app = server();

test('GET /', t => {
  request(app)
    .get('/')
    .expect(200)
    .end(function (error) {
      t.error(error, 'No errors');
      t.end();
    });
});
