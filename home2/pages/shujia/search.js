route.controller("SECtrl",["$scope","$location","$routeParams","$http",function($scope,$location,$routeParams,$http){

	$scope.id=$routeParams.id;
	$scope.examp=$routeParams.examp;
	$scope.search=$routeParams.search;

//这个地方需要传回来的数据的字段名需要更改
	var fh=$('#circle')
	console.log(fh);
	var hrefs=fh[0].hash;

	$scope.circle=function(){
		console.log(4444);
		hrefs=localStorage.back;
		console.log(hrefs);
		$location.$$url=hrefs;
		location.hash=hrefs;
		localStorage.back=hrefs;
	}

	var search=$http({
		url:hosturl+"app/apporderse",
		method:"GET"
	}).success(function(data){

	}).error(function(data){
		console.log('处理失败');
	})
	search.then(function (data) {
		$scope.search=data.data;
		$scope.xianshi=true;
	})


	$('#header-book .inner-box .search-center input').on('keyup',function(){
		var vals=$(this).val();
		if(vals){
			var search=$http({
				url:hosturl+"app/appsearch?name="+vals,
				method:"get"
            }).success(function(data){

			}).error(function(data){
				console.log('处理失败');
			})
			search.then(function (data) {
			    console.log(data.data);
				if(data.data.status==0){
					$scope.xianshi=false;
				}else{
					$scope.xianshi=true;
				}
				$scope.search=data.data;
			})
		}else{
			return;
		}
	})
}
])

