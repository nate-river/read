route.controller("VCtrl",["$scope","$http",function($scope,$http){
  var version=$http({
        url:hosturl+"app/servermessage",
        method:"GET"
    }).success(function(data){

    }).error(function(data){
        console.log('处理失败');
    })
    version.then(function (data) {
        $scope.version=data.data;
    })
    }
])