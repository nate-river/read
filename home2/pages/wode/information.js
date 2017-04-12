route.controller("ICtrl",["$scope","$http",function($scope,$http){
    var aa=localStorage.sex;
    
    //如果是女孩子的话
    if(aa == 0){
        $('#my-26 .tx_tan2 .bg1 .quan2_box .quan2 #nv').css(
            {'background':'url("/book/home2/images/myinfo/4-sex_07.jpg")',
                'backgroundSize':'cover'
            })
               $(' #my-26 .tx_tan2 .bg1 .quan_box .quan #nan').css(
            {'background':'url("/book/home2/images/myinfo/4-sex_10.jpg")',
                'backgroundSize':'cover'
            })
    }
    //如果是男孩子
    if(aa == 1){
     $(' #my-26 .tx_tan2 .bg1 .quan_box .quan #nan').css(
     {'background':'url("/book/home2/images/myinfo/5b.png")',
     'backgroundSize':'cover'
     })
         $('#my-26 .tx_tan2 .bg1 .quan2_box .quan2 #nv').css(
            {'background':'url("/book/home2/images/myinfo/5g.png")',
                'backgroundSize':'cover'
            })
     }
    $('#nv').on('touchend',function(){
        $(this).addClass('1');
        $(' #my-26 .tx_tan2 .bg1 .quan_box .quan #nan').removeClass('2');
        $('#my-26 .tx_tan2 .bg1 .quan2_box .quan2 #nv').css(
            {'background':'url("/book/home2/images/myinfo/4-sex_07.jpg")',
                'backgroundSize':'cover'
            })
        $(' #my-26 .tx_tan2 .bg1 .quan_box .quan #nan').css(
            {'background':'url("/book/home2/images/myinfo/4-sex_10.jpg")',
                'backgroundSize':'cover'
            })
          
            
    })
    $('#nan').on('touchend',function(){
        $(this).addClass('2');
        $('#my-26 .tx_tan2 .bg1 .quan2_box .quan2 #nv').removeClass('1');
        $(' #my-26 .tx_tan2 .bg1 .quan_box .quan #nan').css(
            {'background':'url("/book/home2/images/myinfo/5b.png")',
                'backgroundSize':'cover'
            })
        $('#my-26 .tx_tan2 .bg1 .quan2_box .quan2 #nv').css(
            {'background':'url("/book/home2/images/myinfo/5g.png")',
                'backgroundSize':'cover'
            })
            
    })
//   $('#quxiao2s').on('touchend',function(){
//        //发送请求改性别
//        var aa;
//        if($('#nv').hasClass('1')){
//            aa=0;
////            localStorage.sex=aa;
//        }
//        if($('#nan').hasClass('2')){
//            aa=1;
////            localStorage.sex=aa;
//        }
//        var sex=$http({
//            url:hosturl+"user/appsetgender?gender="+aa,
//            method:"GET"
//        }).success(function(data){
//
//        }).error(function(data){
//            console.log('处理失败');
//        })
//        sex.then(function (data) {
//            $scope.sex=data.data;
//        })
//        $("#tan2").css("display","none");
//    })
//    点击取消
    $scope.quxiao=function () {
        $("#tan2").css("display","none");
    }
    $scope.que=function(){
            //发送请求改性别
        var aa;
        if($('#nv').hasClass('1')){
            aa=0;
//            localStorage.sex=aa;
        }
        if($('#nan').hasClass('2')){
            aa=1;
//            localStorage.sex=aa;
        }
        var sex=$http({
            url:hosturl+"user/appsetgender?gender="+aa,
            method:"GET"
        }).success(function(data){

        }).error(function(data){
            console.log('处理失败');
        })
        sex.then(function (data) {
            $scope.sex=data.data;
        })
       
        $("#tan2").css("display","none");
    }
}])
route.directive("ngMyziliao",[function(){
    return{
        restrict:'A',
        replace:true,
        template:"<ul id='ziliao'><div ng-transclude></div></ul>",
        transclude:true,
        link:function($scope,el){
            $("#xtx1s").on("touchend",function(){
                $("#tan1").css("display","block");
            })
            $("#quxiaos").on("touchend",function(){
                $("#tan1").css("display","none");
            })
            $("#xxbs").on("touchend",function(){
                $("#tan2").css("display","block");
            })
//            $("#quxiao2s").on("touchend",function(){
//                $("#tan2").css("display","none");
//            })
        }
    }
    
    
}])