angular.module('ng-webpack').directive('main', function () {
    return {
        restrict: 'E',
        template: require('./main.html'),
        replace: true,
        scope: {
        },
        controller: function ($rootScope, $scope, $uibModal, testService) {

            $scope.items = [
                'The first choice!',
                'And another choice for you.',
                'but wait! A third!'
            ];

            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;

            $scope.open = function () {
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: require('./modal.html'),
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
                //
                // modalInstance.result.then(function (selectedItem) {
                //     $ctrl.selected = selectedItem;
                // }, function () {
                //     $log.info('Modal dismissed at: ' + new Date());
                // });
            };

            $scope.onClick = function () {
                console.log('onClick');
                console.info('lodash', _.sortBy([]));
                console.info('jquery', $('#btn'));
                testService.sayHello();
            }

        }
    }
}).controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
