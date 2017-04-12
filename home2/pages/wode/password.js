route.controller("PCtrl",["$scope",function($scope){
    $(".head-img").on("click",function(){
        $(".mask").show()
        $(".set-head").show()
    })
    $(".sex").on("click",function(){
        $(".mask").show()
        $(".sex").show()
    })
}
])
route.directive("ngMymima",[function(){
	return{
		restrict:'A',
		replace:true,
		template:"<div id='bd_neirong'><div ng-transclude></div></div>",
		transclude:true,
		link:function($scope,el){
			$(".ssjhs").on("focus",function(){
				$(".ssjh").html("");
			})
			$(".syzms").on("focus",function(){
				$(".syzm").html("");
			})
		}
	}
	
	
}])