
route.directive('booktab',[function(){
	// localStorage.back=$scope.active;

	return{
		restrict:"E",
		replace:true,
		scope:{
			pics:'=',
			//传入图片数组
			drops:'@',
			//目标类名
			myClass:'@',
			//利用link增加类名
		},
		templateUrl:'home2/components/booktab/booktab.html',
		link:function($scope,el){
			
			$scope.aa=localStorage.active;
			$scope.bb=localStorage.erji;
			$scope.bianliang=localStorage.bianliang;
			$(el).on('touchend',"li",function  () {

				// console.log($scope.drops);
				$(el).find('.showing').removeClass('active');
				$(this).children('.showing').addClass('active');
				$('.'+$scope.drops).removeClass('active');
				var index=$(this).index();
				$('.'+$scope.drops).eq(index).addClass('active');
			})
		}	
	}
}])