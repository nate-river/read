route.controller("RECtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    $scope.search = $routeParams.search;
    $scope.id = $routeParams.id;

    $scope.examp = $routeParams.examp;
    console.log($scope.id);
    $scope.star = [];
    $scope.list = $scope.jing;
    if ($routeParams.search == 0) {
        $scope.detail = $scope.jing[$scope.id];
        for (var i = 0; i < $scope.detail.star; i++) {
            $scope.star.push(1)
        }
    }
    $scope.id = $routeParams.id;

    //获取书评内容
    var promise = $http({
        url: hosturl + "books/appallcomment?id=" + $scope.id,
        method: "get"
    }).success(function (data) {

    }).error(function (data) {
        console.log('处理失败');
    })
    promise.then(function (data) {
        $scope.shuping = data.data;
//        console.log($scope.shuping[0].content);
    })

    //返回按钮
    $scope.back = function () {
        history.back();
    }
    
//    点赞的时候，发出的请求
    $scope.clickzan=function(ids){
        $http({
            method: 'get',
            url: hosturl + 'books/appread',
            params: {id: ids},
            responseType: 'json'
        }).then(function (res) {

        });
    }
    

}])
