
route.controller("CCtrl",["$scope","$http",function($scope,$http){
	$scope.allid;
	// $scope.arr1=arr1;
	$scope.back=function(){
		history.back();
	}
	console.log('我是水水水水')
	$('.all-sort-box').on('click',function(){
		console.log('我是水水水水')
	})
	/*$('.circle2').on('touchstart',function(){

		$('.all-sort-box').css('display','block')
	})*/
	//获取数据
	/*var choose=$http({
	 url:"",
	 method:"GET"
	 }).success(function(data){
	 // console.log(data);
	 }).error(function(data){
	 console.log('处理失败');
	 })
	 choose.then(function (data) {
	 /!*$scope.ribang=data;*!/
	 $scope.choose=data;
	 })
	 */
	/*$('#quanbu').on('click',function(){
	 console.log('utbfbdfb')
	 console.log($(this).prev())
	 var choose=$http({
	 url:"",
	 method:"GET"
	 }).success(function(data){
	 // console.log(data);
	 }).error(function(data){
	 console.log('处理失败');
	 })
	 choose.then(function (data) {
	 /!*$scope.ribang=data;*!/
	 $scope.choose=data;
	 })
	 })*/
	$('#quanbu').on('touchstart',function(){
		var divs=$('#quanbu ~ div');
		$('.xuanzi').removeClass('change');

		/*divs.each(function(i,v){
			var aaa=v.id;

			$scope.arr1.push(aaa);

		})*/
		$scope.allid=0;

	})
	$('.all-sort-box').on('touchstart','.xuanzi',function(){
		$('#quanbu').removeClass('change');
		$('.xuanzi').removeClass('change');
		$(this).addClass('change');
	/*	$scope.arr1=[];
		$scope.arr1.push($(this)[0].id);*/
		$scope.allid=$(this)[0].id;
		console.log($(this)[0].id)
	})

	$('#zhao-bookshelf').on('touchstart',function(){
		console.log($scope.arr1)
		var qingqiu=$http({
			url:hosturl+"app/appchoose?id="+$scope.allid,
			method:"post",
			data:$scope.arr
		}).success(function(data){
			console.log(data);
		}).error(function(data){
			console.log('处理失败');
		})
		qingqiu.then(function (data) {
			/* /!*$scope.ribang=data;*!/*/
			$scope.qingqiu=data.data;
		})

		$(this).css({"display":"none"});

		$(".circle2").css({"display":"block"})
		return false;
	})

}])
route.directive('search',[function(){
	return{
		restrict:'A',
		replace:true,
		template:'<div class="search-center"><input type="text" /></div>',
		link:function($scope,el){
			var zhao=$('#zhao-bookshelf');
			var input=$(".circle2");
			/*console.log(input)*/
			var box=$(".type-box");
			input.on("touchstart",function(){
				console.log('傻逼')
				zhao.css({"display":"block"});
				$(this).css({'display':"none"})
				return false;
			})
			box.on("touchstart",function(){
				return false;
			});
			/*zhao.on("touchstart",function(){
				zhao.css({"display":"none"});
				input.css({"display":"block"})
				return false;
			})*/
			var two=$(".sorts-box .two");
			two.on("touchstart",function(){
				var index=$(this).index();
				$(".backg").addClass('none').eq(index).removeClass('none');
			});
			var name=$(".all-sort-box .name")
			name.on("touchstart",function(){
				var index=$(this).index();
				name.removeClass('change').eq(index).addClass('change');
			});

			/*$('#quanbu').on('touchstart',function(){
				console.log('点击吧');
				var divs=$('#quanbu ~ div');
				console.log(divs);
				divs.each(function(i,v){
					$scope.arr1.push(v.innerText);
					console.log($scope.arr1);
				})

			})*/



		}
	}
}])

