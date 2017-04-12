route.controller("ShuqianCtrl",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
    $(".mark").addClass("active")
    $(".mynote").removeClass("active")
    $(".mulu").removeClass("active")
    $scope.id=$routeParams.id;
    $scope.search=$routeParams.search;
    $scope.examp=$routeParams.examp;
    var shuqian=$http({
        url:hosturl+"user/mymark?id="+$scope.id,
        method:"GET"
    }).success(function(data){

    }).error(function(data){
        console.log('处理失败');
    })
    shuqian.then(function (data) {
        $scope.shuqian=data.data;
        /*$('.header').on('touchstart','.bookmark',function(e){
            left=e.originalEvent.changedTouches[0].pageX;
            console.log(left)
        })
        $('.header').on('touchend','.bookmark',function(e){
            var n=e.originalEvent.changedTouches[0].pageX;
        })

        $(".header").on('touchmove','.bookmark',function(e) {
            var n = e.originalEvent.changedTouches[0].pageX;
            var x = n - left;
            console.log(x);
            if (x > 0) {
                /!* $(this).css('transition', 'transform 0.8s ease');
                 $(this).css('transform', 'translate3d(0px,0,0)');*!/
                $(this).find('.bigbox').css('display', 'block');
                $(this).find('.bigbox2').css('display', 'none');
            } else if (x < 0) {
                /!*   $(this).css('transition', 'transform 0.8s ease');
                 $(this).css('transform', 'translate3d(-50px,0,0)');*!/
                $(this).find('.bigbox').css('display', 'none');
                $(this).find('.bigbox2').css('display', 'block');
            }
        })*/
        var start,end;
        $('body').on('touchstart','.bookmark',function (e) {
            start=parseInt(e.originalEvent.changedTouches[0].pageX);
        })
        $('body').on('touchmove','.bookmark',function (e) {

        })
        $('body').on('touchend','.bookmark',function (e) {
            end = parseInt(e.originalEvent.changedTouches[0].pageX);
            var move=end-start;
            if(move<0&&(Math.abs(move))>80){
                /*$(this).css('transition', 'transform 0.8s ease');
                $(this).css('transform', 'translate3d(-50px,0,0)');*/
                $(this).find('.bigbox1').hide();
                $(this).find('.bigbox2').show();
                $(this).on('click','.cha',function () {
                    $(this).parents('.bookmark').remove();
                })
            }
            else if(move>80){
                /*$(this).css('transition', 'transform 0.8s ease');
                $(this).css('transform', 'translate3d(0px,0,0)');*/
                $(this).find('.bigbox1').show();
                $(this).find('.bigbox2').hide();
            }
        })
    })

    // 这是点击删除，传一个id来删除笔记
    $scope.shanchu=function(ids){
        //再加一个书的id $scope.id
        var shanchu=$http({
            url:hosturl+"user/delmymark?id="+ids,
            method:"get"
        }).success(function(data){
            // console.log(data);
        }).error(function(data){
            console.log('处理失败');
        })
        shanchu.then(function (data) {
            $scope.shanchu=data;
        })
    }

}])
route.directive('ngX',[function(){
    return{
        restrict:"A",
        template:"<div><div ng-transclude></div></div>",
        replace:true,
        transclude:true,
        link:function($scope,el){
            $(".zhengwen").on('touchend',function(){
                  $('#header').toggle();
            })
            $(".zhengwen").on('touchend',function(){
                  $('#end').toggle();
            })
            $(".circles2").on('touchend',function(){
                  $('#s-43').show();
            })
            $(".zhengwen").on('touchend',function(){
                  $('#s-43').hide();
            })
            $(".circles3").on('touchend',function(){
                  $('#s-44').show();
            })
            $(".zhengwen").on('touchend',function(){
                  $('#s-44').hide();
            })
        }
    }
}])