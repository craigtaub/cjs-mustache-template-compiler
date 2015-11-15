import page from 'page';
import file from './file';
// var page = require('page');
// var file = require('./file');

page('/', file.bootstrap);

page();
