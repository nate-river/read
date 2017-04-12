route.controller("homeCtrl",['$scope',function($scope){

}])

route.directive(
    'bkCommon',
    [
        function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'components/common.html',
                transclude: true,
                scope: {
                    user: '='
                },
                controller: function ($scope) {

                },
                link: function (scope, el) {

                }
            }
        }
    ]
);

