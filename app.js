var express = require('express'),
    path = require('path'),
    falcorExpress = require('falcor-express'),
    Router = require('falcor-router'),
    bodyParser = require('body-parser'),
    q = require("q");

var config = require('./config/config.js'),
    BowerData = require('./data/15-12-19-BowerPackages.json'),
    registry = require('./workers/registry-worker.js'),
    cors = require('./config/cors.js'),
    init = require('./router/init'),
    router = require('./router'),
    npmWorker = require('./workers/npm-worker.js'),
    app = express();

app.use(cors);
app.use(express.static(__dirname + '/'));

app.use('/init', init);
app.use('/npm', npmWorker.fetchFromNpm);
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new router();
}));


app.listen(config.port);
console.log(
  'cookiejar running on port ' + config.port + '\n' +
  'rethinkDB running on ' + config.thinkHost + ":" +config.thinkPort + " using DB: " +config.thinkDB + '.'
);

module.exports = app;