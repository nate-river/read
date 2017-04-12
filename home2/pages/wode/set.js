route.controller("SCtrl",["$scope","$http",function($scope,$http){
   $(".rest").on("click",function(){
       $(".mask").show()
       $(".read").show()
   })
    $(".clear").on("click",function(){
        $(".mask").show()
        $(".clear-item").show()
    })
    $(".mask").on("click",function(){
        $(this).hide()
        $(".tanchu").hide()
    })
    $(".cancel").on("click",function(){
        $(".mask").hide()
        $(".tanchu").hide()
    })
    $(".last").on("click",function(){
       $(".flag").toggleClass("active")
    })
    $scope.back=function(){
		history.back();
	}

 //点击退出登录
   $('.cjx-exit').on('click',function () {
       localStorage.user_data=null;
       $http({
           method: 'get',
           url: hosturl + 'login/appexit',
           responseType: 'json'
       }).then(function (data){
           //先弹框
           if(data.data.status==1) {
               $('.tishi').css("transform","scale(1, 1)");
               setTimeout(function () {
                   location.href = "#/";
                   location.reload();
               },2000)
           }
           //再执行
       });
   })

    //这是阅读提醒
    var lis= $('.cjx-tixingsetting li')
    lis.on('touchstart',function(){
        $('.cjx-tixingsetting li').removeClass('active');
        $(this).addClass('active');
    })
    $('#cjx-que').on('touchstart',function(){
        lis.each(function(i,v){
            if($(this).hasClass('active')){
                console.log('odd')
                var texts=$(this).find('.cjx-yueduti').text();
                console.log(texts);
                $('#cjx-xiuxi').find('.cjx-ver').text(texts);
            }
        })
        $('#cjx-tan').css("transform","scale(0,0)")
        var textinner=$('#cjx-xiuxi').find('.cjx-ver').text();
        if(textinner=="关闭阅读提醒"){
            localStorage.tixing=0;
        }
        if(textinner=="阅读15分钟后"){
            localStorage.tixing=1;
        }
        if(textinner=="阅读30分钟后"){
            localStorage.tixing=2;
        }
        if(textinner=="阅读60分钟后"){
            localStorage.tixing=3;
        }
    })
  if(localStorage.tixing==0){
      lis.eq(0).addClass('active');
      $scope.wenzi='关闭阅读提醒'
  }
    if(localStorage.tixing==1){
        lis.eq(1).addClass('active');
        $scope.wenzi='阅读15分钟后'
    }
    if(localStorage.tixing==2){
        lis.eq(2).addClass('active');
        $scope.wenzi='阅读30分钟后'
    }
    if(localStorage.tixing==3){
        lis.eq(3).addClass('active');
        $scope.wenzi='阅读60分钟后'
    }

    //启动上次阅读
    var qidong=$('#cjx-icon5');

    qidong.on('touchstart',function () {
        console.log('5555555555555')
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            localStorage.start=1;
            console.log(localStorage.start)
        }else{

        }

    })
    $scope.qidong=function(){
        $('#cjx-icon5').toggleClass('active');
        if($('#cjx-icon5').hasClass('active')){
            // ExampleController($cookies)
            
        }else{
            // localStorage.qidong=null;
            // del($cookies);
        }
    }
    /*function ExampleController($cookies) {
        // Put cookie
        $cookieStore.put('myFavorite','oatmeal');
    }

    //清除cookies
    function del($cookies){
        $cookieStore.remove('myFavorite');

    }*/
    }
])
route.directive('lzXxk',[function(){
  return{
    restrict:'A',
    replace:true,
    transclude:true,
    template:'<div class="cjx-setting"><div ng-transclude></div></div>',
    link:function($scope,el){
      $(function(){
  $('#cjx-banben').on('click',function(){
    $('#cjx-tanchu').css("transform","scale(1,1)")
  })
  $('#cjx-quxiao').on('click',function(){
    $('#cjx-tanchu').css("transform","scale(0,0)")
  })
  $('#cjx-xiuxi').on('click',function(){
    $('#cjx-tan').css("transform","scale(1,1)")
  })
  $('#cjx-qu').on('click',function(){
    $('#cjx-tan').css("transform","scale(0,0)")
  })
  
  
  $('#cjx-qingchu').on('click',function(){
    $('#cjx-tanchu2').css("transform","scale(1,1)")
  })
  $('#cjx-quxiao1').on('click',function(){
    $('#cjx-tanchu2').css("transform","scale(0,0)")
  })
  
  $('#cjx-xuanze').on('click',function(){
    $('#cjx-touxiangxuanze').css("transform","scale(1,1)")
  })
  $('#cjx-quxiao').on('click',function(){
    $('#cjx-touxiangxuanze').css("transform","scale(0,0)")
  })
  
  $('#cjx-xingbie').on('click',function(){
    $('#cjx-xingbiexuanze').css("transform","scale(1,1)")
  })
  $('.cjx-queding').on('click',function(){
    $('#cjx-xingbiexuanze').css("transform","scale(0,0)")
  })

/*  //启动上次阅读
  $('.cjx-xinxi .cjx-banben .cjx-icon5').on('click',function () {
      $(this).toggleClass('active');
      if($(this).hasClass('active')){
          localStorage.start=1;
          console.log(localStorage.start)
      }else{

      }

  })*/
  
})
    }
  }
}])