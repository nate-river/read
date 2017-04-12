route.controller("NCtrl",["$scope","$http",function($scope,$http){
        $scope.newsList=[{name:"书城",content:"消息的详细内容",date:"今天"},{name:"书城",content:"消息的详细内容",date:"昨天"},{name:"书城",content:"消息的详细内容",date:"前天"}]
         $scope.remarkList=[{name:"某某某",content:"消息的详细内容",date:"今天"},{name:"某某某",content:"消息的详细内容",date:"昨天"},{name:"某某某",content:"消息的详细内容",date:"前天"}]

    $('#mynews').on('click',function(){
        //获取书评内容
        var mynews=$http({
            url:"",
            method:"GET"
        }).success(function(data){

        }).error(function(data){
            console.log('处理失败');
        })
        mynews.then(function (data) {
            $scope.mynews=data.data;
        })
    })
    $('#xitongnews').on('click',function(){
        //获取书评内容
        var xitong=$http({
            url:"",
            method:"GET"
        }).success(function(data){

        }).error(function(data){
            console.log('处理失败');
        })
        xitong.then(function (data) {
            $scope.xitong=data.data;
        })
    })
    $(".news-lists").eq(0).show()
        $(".line").eq(0).addClass("active")
        $(".news").on("click",".news-menue",function(){
            $(".line").removeClass("active")
            $(this).find(".line").addClass("active")
            $(".news-lists").hide()
            $(".news-lists").eq($(this).index()).show()
        })

    }
])
route.directive('ngLine',[function(){
    return {
        restrict:'A',
        replace:true,
        transclude:true,
        template:'<div class="mS-line"><div ng-transclude></div></div>',
        link:function($scope,el){
            var msLf=$(".messageS-select .mS-left-font");
            var msRf=$(".messageS-select .mS-right-font");
            var msL=$(".messageS-select .mS-left");
            var msR=$(".messageS-select .mS-right");
            var msC=$(".messageS-con");
            var mmC=$(".messageM-con");
            msLf.on('touchend',function(){
                msL.removeClass('messagse-dis');
                msR.addClass('messagse-dis');
                msC.removeClass('messagse-dis');
                mmC.addClass('messagse-dis');
            })
            msRf.on('touchend',function(){
                msR.removeClass('messagse-dis');
                msL.addClass('messagse-dis');
                mmC.removeClass('messagse-dis');
                msC.addClass('messagse-dis');
            })
        }
    }
}])