route.controller("BCtrl",["$scope","$location","$routeParams","$http",function($scope,$location,$routeParams,$http){
    localStorage.bianliang=2;
   
    var fh=$('#bangdan')
    var hrefs=fh[0].hash;
    hrefs=localStorage.back;
    $scope.bdback=function(){
        $location.$$url=hrefs;
        location.hash='#/bookcity';
        localStorage.active=1;
        localStorage.back=location.hash;
    }
    localStorage.back=location.hash;
    // console.log(localStorage.erji);
    var lcs=$('.lc-main');
    if(localStorage.erji==0){
        lcs.each(function(i,v){
            if(i==0){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        })
    }
    if(localStorage.erji==1){
        lcs.each(function(i,v){
            if(i==1){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        })
    }
    if(localStorage.erji==2){
        lcs.each(function(i,v){
            if(i==2){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        })
    }

    $(".jingxuan").eq(0).show();
    $(".leader .menue").eq(0).addClass("active");
    $(".leader .menue").on("click",function(){
       $(".leader .menue").removeClass("active");
       $(this).addClass("active");
       $(".jingxuan").hide();
       $(".jingxuan").eq($(this).index()).show();
    })
    $scope.id=$routeParams.id;
    $scope.search=$routeParams.search;
    $scope.examp=$routeParams.examp;
    $scope.detail=$scope.bang[$scope.examp];
    console.log($scope.bang[$scope.examp]);

    //发送榜单id,获取对应榜单的日榜、周榜、总榜
    var promise=$http({
        url:hosturl+"category/appexample?id="+$scope.examp,
        method:"get"
    }).success(function(data){

    }).error(function(data){
        console.log('处理失败');
    })
    promise.then(function (data) {
        /*$scope.ribang=data;*/
        $scope.bangdan=data.data;
        console.log($scope.bangdan);
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