window.$ = require('../bower_components/jquery/dist/jquery.js');
angular.module('ng-webpack', []);

var req = require.context("./components", true, /\.(js|css)$/);
req.keys().forEach(function(key){
    req(key);
});
