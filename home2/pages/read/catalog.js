route.controller("CatalogCtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;
    $scope.search = $routeParams.search;
    $scope.examp = $routeParams.examp;
    $scope.back = function () {
        history.back();
    };
    var catalog = $http({
        url: hosturl + "books/getCategories?id=" + $scope.id,
        method: "GET"
    }).success(function (data) {

    }).error(function (data) {
        console.log('处理失败');
    });
    catalog.then(function (data) {
        /*$scope.ribang=data;*/
        $scope.catalog = data.data;
    });

    $('.g-cata ').on('touchstart','li',function(){
        var ids=$(this).attr('id');
        localStorage.bian=1;
    })

}]);
route.directive('ngX', [function () {
    return {
        restrict: "A",
        template: "<div><div ng-transclude></div></div>",
        replace: true,
        transclude: true,
        link: function ($scope, el) {
            $(".mark").removeClass("active")
            $(".mynote").removeClass("active")
            $(".mulu").addClass("active")
            $(".zhengwen").on('touchend', function () {
                $('#header').toggle();
            })
            $(".zhengwen").on('touchend', function () {
                $('#end').toggle();
            })
            $(".circles2").on('touchend', function () {
                $('#s-43').show();
            })
            $(".zhengwen").on('touchend', function () {
                $('#s-43').hide();
            })
            $(".circles3").on('touchend', function () {
                $('#s-44').show();
            })
            $(".zhengwen").on('touchend', function () {
                $('#s-44').hide();
            })
        }
    }
}])