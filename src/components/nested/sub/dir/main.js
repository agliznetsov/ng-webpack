angular.module('ng-webpack').directive('main', function () {
    return {
        restrict: 'E',
        template: require('./main.html'),
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