route.controller("bookcityCtrl", ["$scope", "$routeParams","$http", function ($scope, $routeParams,$http) {


}])
route.directive('lunbo',[function(){
	return{
		restrict:"E",
		replace:true,
		scope:{
			pics:'=',
			//传入图片数组
			time:'=',
			//运动时间
			myClass:'@',
			//利用link增加类名
			hasDian:'=',
			//是否要圆点
			effect:'@'
			//运动方式
		},
		templateUrl:'home2/components/lunbo/lunbo.html',
		link:function($scope,el){
			var i=0;
			var num=0;
			var start;
			$(el).find('.dian li').eq(num).addClass("active");
			var t=setInterval(movel,$scope.time);
			//此轮播方式利用css3进行页面轮播操作
			
			//向左移动动画
			function movel(){
				i-=$(".wrapper").width();	
				if(i<-$(".wrapper").width()*($scope.pics.length-1)){
					i=0;
				}
				$(el).find('.chang').css('transform','translateX('+i+'px)')
				num+=1
				if(num===$scope.pics.length){
					num=0;
				}
				$(el).find('.dian li').removeClass('active').eq(num).addClass("active")
			}
			
			//向右移动动画
			function move(){
				i+=$(".wrapper").width();	
				if(i>0){
					i=-$(".wrapper").width()*(($scope.pics.length)-1);
				}
				$(el).find('.chang').css('transform','translateX('+i+'px)')
				num-=1
				if(num<0){
					num=$scope.pics.length-1;
				}
				$(el).find('.dian li').removeClass('active').eq(num).addClass("active")
			}
			
			$(el).find('.wrapper').on('touchstart',function(e){
				//触摸屏幕清除时间函数  停止动画 
				clearInterval(t)
				//触摸屏幕 记录开始位置
				start=e.originalEvent.changedTouches[0].clientX;		
			})
			$(el).find('.wrapper').on('touchend',function(e){
				//触摸屏幕 记录结束位置
			    var end=e.originalEvent.changedTouches[0].clientX;
			    //判断移动方向 进行相应动画
			    if(start-end>100){
			    	movel();
			    }
			    if(start-end<-100){
			    	move();	
			    }
			    //再次设置时间函数  开始动画
				t=setInterval(movel,$scope.time);
			})
	
			if($scope.effect==='opacity'){
				//轮播方式1
			}else if($scope.effect==='zIndex'){
				//轮播方式2
			}
		}
	}
}])