var express = require('express');
var app = express();
var routes = require('./routes')(app);
var server = require('./server')(app);
var mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/../views');
app.use(express.static(__dirname + '/../public')); // set static folder

module.exports = app;
