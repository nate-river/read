route.controller("BookCtrl",["$scope","$http",function($scope,$http){
 localStorage.back='#/';
  
    //banner 部分是以推荐来请求数据
  $http({
    method: 'get',
    url: hosturl + 'app/appad'
  }).then(function (res) {
    $scope.banner = res.data;
  });
  var shujia = $http({
		url:hosturl+"user/appmybook?jingdu="+localStorage.page,
		method:"GET"
	}).success(function(data){
		
	})
	
	shujia.then(function(data){
	$scope.shujia=data;
	
})
    }

])
route.directive('banner',[function(){
  return{
    restrict:'A',
    replace:true,
    transclude:true,
    template:'<div class="banner"><div ng-transclude></div></div>',
    link:function($scope,el){
      var li=$("#lightButton li");
      var t=setInterval(move,4000);
      var now=0;
        var next=0;
        var flag=true;
            function move(){
        next=now+1;
        if(next>=$(".dg-wrapper").length){
          next=0;
        }
        $(".dg-wrapper").css({"display":"none",opacity:0.8}).eq(next).css({display:"block"}).animate({opacity:1},500,function(){flag=true});
       li.removeClass('first').eq(next).addClass('first');
        now=next;
       }
    }
  }
}])
route.directive('lunbo',[function(){
  return{
    restrict:'A',
    replace:true,
    transclude:true,
    template:'<div class="huadong-box"><div ng-transclude></div></div>',
    link:function($secope,el){
      var box=$('.three-box');
      var flag=true;
      var start;
      box.on('touchstart',function(e){
        start=e.originalEvent.changedTouches[0].clientX;
      })
      box.on('touchend',function(e){
        end=e.originalEvent.changedTouches[0].clientX;
        var width=$('.float:first').outerWidth();
        var n=0;
        if(end+50<start){
          box.stop().animate({'left':-width},function(){
            box.append($('.float:first')).css({'left':0});
            flag=true;
          })
          flag=false;
        }else if(end-50>start){
          $('.float:last').insertBefore($('.float:first'));
          box.css({'left':-width}).animate({'left':0},function(){
              flag=true; 
          })
          flag=true;
        }
      })
    }
  }
}]);