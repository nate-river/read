route.directive(
    'common',
    [
        function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: boot+'/Admin3/components/common.html',
                transclude: true,
                scope: {
                    user: '='
                },
                controller: function ($scope) {

                },
                link: function (scope, el) {
                }
            }        }
    ]
);


