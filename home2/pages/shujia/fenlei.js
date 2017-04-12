route.controller("FCtrl",["$scope","$location","$routeParams","$http",function($scope,$location,$routeParams,$http){
    localStorage.bianliang=2;
  
    var fh=$('#box #fenlei')
  
    var hrefs=fh.hash;
    hrefs=localStorage.back;
    $scope.flback=function(){
        $location.$$url=hrefs;
        location.hash='#/bookcity';
        localStorage.active=2;
        localStorage.back=location.hash;
        console.log(hrefs);
        console.log(localStorage.active)
    }
    localStorage.back=location.hash
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

        //{"id":"7","parentid":"3","grandid":"1","name":"职场"}

        //发送分类对应的id,获取对应的推荐、热读和上架类
        var promise=$http({
            url:hosturl+"category/appcategory?id="+$routeParams.id,
            method:"get"
        }).success(function(data){

        }).error(function(data){
            console.log('处理失败');
        })
        promise.then(function (data) {
            $scope.tuijian=data.data;
            console.log($scope.tuijian)

        })

        //点击返回到之前页面
        $scope.back=function(){
            history.back();
        }
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