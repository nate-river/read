route.controller("ACtrl",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
$('.rightNow').on("click",function(){
	var vals=$('#yijian').val();
	var yijian=$http({
		url:hosturl+"app/appback",
		method: "POST",
        headers: "Content-Type': 'application/x-www-form-urlencoded",
		data:{"content":vals}
	}).success(function(data){
		
	}).error(function(data){
		console.log('处理失败');
	})
	yijian.then(function (data) {
		$scope.yijian=data.data;
		console.log($scope.yijian);
		$('.cjx-tanchu1').css("transform","scale(1,1)");
		setTimeout(function () {
			location.href='#/Myinfo';
		},2000)

	})
})


   
}])
route.directive('ngCc23',[function(){
	return{
		restrict:'A',
		replace:true,
		template:'<div class="l-circle"></div>',
		link:function($scope,el){
			$(".feedback-input textarea").on('focus',function(){
				$(".fb-reminder").addClass("feedback-dis");
			})
			$(".feedback-input textarea").on('blur',function(){
				$(".fb-reminder").removeClass("feedback-dis");
			})
		}
	}
}])