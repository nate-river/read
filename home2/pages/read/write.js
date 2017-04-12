route.controller('WriteCtrl',['$scope',"$routeParams","$http",function($scope,$routeParams,$http){
	$scope.id=$routeParams.id;
	$scope.search=$routeParams.search;
	$scope.examp=$routeParams.examp;
//	
	/*var write=$http({
	    url:hosturl+"books/bookshow?id="+$scope.id,
	    method:"GET"
	}).success(function(data){
	    console.log(data);
	}).error(function(data){
	    console.log('处理失败');
	})
	write.then(function (data) {
	    
	    $scope.write=data.data;
	    console.log($scope.detail)
	})*/
//	点击确定的时候，向后台传输数据
	$scope.queding=function(){
		var texts=$('textarea').val();
		var pushes=$http({
		    url:hosturl+"books/bookshow?id="+$scope.id,
		    method:"GET"
		}).success(function(data){
		    console.log(data);
		}).error(function(data){
		    console.log('处理失败');
		})
		pushes.then(function (data) {

		    $scope.pushes=data.data;
		    console.log($scope.detail)
		})
	}
}])