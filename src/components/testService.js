'use strict';

angular.module('ng-webpack').service('testService', function() {

    this.sayHello = function () {
        console.info("Hello, world!");
    };

});
