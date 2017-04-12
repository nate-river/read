route.controller("MyinfoCtrl",["$scope","$routeParams","$http",function($scope,$routeParams,$http){

}])
route.directive('lzwXxk',[function(){
	return{
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<ul class="cjx-xinxi"><div ng-transclude></div></ul>',
		link:function($scope,el){
			$(function(){
	$('#cjx-banben').on('click',function(){
		$('#cjx-tanchu').css("transform","scale(1,1)")
	})
	$('#cjx-quxiao').on('click',function(){
		$('#cjx-tanchu').css("transform","scale(0,0)")
	})
	$('#cjx-xiuxi').on('click',function(){
		$('#cjx-tan').css("transform","scale(1,1)")
	})
	$('#cjx-qu').on('click',function(){
		$('#cjx-tan').css("transform","scale(0,0)")
	})
	
	
	$('#cjx-qingchu').on('click',function(){
		$('#cjx-tanchu2').css("transform","scale(1,1)")
	})
	$('#cjx-quxiao1').on('click',function(){
		$('#cjx-tanchu2').css("transform","scale(0,0)")
	})
	
	$('#cjx-xuanze').on('click',function(){
		$('#cjx-touxiangxuanze').css("transform","scale(1,1)")
	})
	$('#cjx-quxiao').on('click',function(){
		$('#cjx-touxiangxuanze').css("transform","scale(0,0)")
	})
	
	$('#cjx-xingbie').on('click',function(){
		$('#cjx-xingbiexuanze').css("transform","scale(1,1)")
	})
	$('.cjx-queding').on('click',function(){
		$('#cjx-xingbiexuanze').css("transform","scale(0,0)")
	})
	
})
		}
	}
}])