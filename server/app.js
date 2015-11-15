// Entry point

require('babel/register');
 //tells it to transform es6
 // It hooks into all require calls to transpile your app at runtime, and lets you start your app with regular Node.

require('./server').start();
// had code here before and some reason above didnt work ?????
// needed to be required in
