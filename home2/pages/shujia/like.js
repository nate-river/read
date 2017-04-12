route.controller("LICtrl",["$scope","$location","$routeParams","$http",function($scope,$location,$routeParams,$http){
    localStorage.back='#/like';
        $(".leader .menue").eq(0).addClass("active")
        $(".jingxuan").eq(0).show()
        $(".leader .menue").on("click",function(){
            $(".leader .menue").removeClass("active")
            $(this).addClass("active")
            $(".jingxuan").hide()
            $(".jingxuan").eq($(this).index()).show()
        })

        //获取对应榜单的id值
        $scope.detail1=$routeParams.name;


     //这个地方我需要一个id
     var like=$http({
     url:hosturl+"app/appmylike",
     method:"post",
     data:$scope.arr
     }).success(function(data){
     // console.log(data);
     }).error(function(data){
     console.log('处理失败');
     })
     like.then(function (data) {
    /* /!*$scope.ribang=data;*!/*/
     $scope.like=data.data;
         console.log(data);
         console.log($scope.like);
     })

}

])
    route.directive('myXxk',[function(){
  return{
    restrict:'A',
    replace:true,
    transclude:true,
    template:'<div class="lc-nav"><div ng-transclude></div></div>',
    link:function($scope,el){
      $('#lc-head .lis').on('touchend',function  () {
        $('#lc-head .showing').removeClass('active');
        $(this).children('.showing').addClass('active');
        $('.lc-main').removeClass('active');
        var index=$(this).index();
        $('.lc-main').eq(index).addClass('active');
      })
    }
  }
}])