require('babel-register');
var minimist = require('minimist');
var App = require('./src/server/server');

var config = minimist(process.argv.slice(2), {
  string: ['pid', 'port', 'socket'],
  boolean: ['cors'],
  alias: {
    h: 'help',
    v: 'version'
  },
  default: {
    port: 4000
  }
});

if (config.version) {
  console.log(require('./package.json').version);
  process.exit(0);
}

var app = App.default(config);

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('📡  ON AIR @ %s:%s', host, port);
});

// Catch SIGINT (Ctrl+C) to exit process
process.on('SIGINT', function () {
  console.warn('Caught SIGINT, terminating');
  server.close();
  process.exit();
});