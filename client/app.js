var page = require('page');
var file = require('./file');

page('/', file.bootstrap);

page();
