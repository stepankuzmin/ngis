#!/usr/bin/env node

require('babel-register');
require('babel-polyfill');

var App = require('./src/server');
var dbConfig = require('./db/config.js');
var defaults = require('./src/server').defaults;
var fs = require('fs');
var knex = require('knex');
var minimist = require('minimist');
var packagejson = require('./package.json');

var knex = knex(dbConfig[process.env.NODE_ENV]);
var config = minimist(process.argv.slice(2), {
  string: [
    'port',
    'socket'
  ],
  alias: {
    v: 'version'
  },
  default: {
    knex: knex,
    port: 4000,
  }
});

if (config.version) {
  console.log(packagejson.version);
  process.exit(0);
};

var app = App.default(config);
var handler = config.socket || config.port;

var server = app.listen(handler, function () {
  var endpoint;
  if (config.socket) {
    endpoint = config.socket;
    fs.chmodSync(config.socket, '1766');
  } else {
    endpoint = server.address().address + ':' + server.address().port;
  }
  console.log('🚀  ON AIR @ %s', endpoint);
});

// Catch SIGINT (Ctrl+C) to exit process
process.on('SIGINT', function () {
  console.warn('Caught SIGINT, terminating');
  knex.destroy();
  server.close();
  process.exit();
});
