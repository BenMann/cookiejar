var express = require('express'),
    path = require('path')
    bodyParser = require('body-parser');

var config = require('./config/config.js'),
    cors = require('./config/cors.js'),
    index = require('./routes/index'),
    packages = require('./routes/packages');

var app = express();
// app.enable('strict routing');
app.use(cors);
app.use(bodyParser.json());
app.use('/', index);
app.use('/packages', packages);

app.listen(config.port);
console.log(
  'cookiejar running on port ' + config.port + '\n' +
  'rethinkDB running on ' + config.thinkHost + ":" +config.thinkPort + " using DB: " +config.thinkDB + '.'
);

module.exports = app;