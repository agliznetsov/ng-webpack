angular.module('ng-webpack').directive('app', function () {
    return {
        restrict: 'E',
        template: require('./app.html'),
        replace: true,
        scope: {
        },
        controller: function ($rootScope, $scope, testService) {

            $scope.onClick = function () {
                console.log('onClick');
                console.info('lodash', _.sortBy([]));
                console.info('jquery', $('#btn'));
                testService.sayHello();
            }

        }
    }
});