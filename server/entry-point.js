// var express = require('express');
// var app = express();
// var routes = require('./routes')(app);
// var server = require('./server')(app);
// var mustacheExpress = require('mustache-express');

require('babel/register');
 //tells it to transform es6  // It hooks into all require calls to transpile your app at runtime, and lets you start your app with regular Node.

require('./app');

// import express as 'express';
//
// import routes as './routes';
// import server as './server';
// import mustacheExpress as 'mustache-express';
// const app = express();
//
// // Register '.mustache' extension with The Mustache Express
// app.engine('mustache', mustacheExpress());
// app.set('view engine', 'mustache');
// app.set('views', __dirname + '/../views');
// app.use(express.static(__dirname + '/../public')); // set static folder
//
// // module.exports = app;
// // export default app;
