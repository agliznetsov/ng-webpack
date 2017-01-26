angular.module('ng-webpack', ['ui.bootstrap']);

var req = require.context("./components", true, /\.(js|css)$/);
req.keys().forEach(function(key){
    console.log('loading ', key);
    req(key);
});
