route.controller("RCtrl", ["$scope", "$routeParams", "$location", "$http", function ($scope, $routeParams, $location, $http) {
    $scope.search = $routeParams.search;
    $scope.id = $routeParams.id;
    $scope.star = [];

    var fh=$('#fanhui')
    var hrefs=fh[0].hash;
    hrefs=localStorage.back;
    $scope.dianji=function(){
      $location.$$url=hrefs;
        localStorage.active=0;
        location.hash=hrefs;
        localStorage.back=hrefs;
        if($scope.search=='ri'){
            localStorage.erji=0
        } else  if($scope.search=='zhou'){
            localStorage.erji=1
        }  else if($scope.search=='zong'){
            localStorage.erji=2
        }else if($scope.search=='search'){
            location.hash='#/search'
        }
    }

    $http({
        method: 'get',
        url: hosturl + 'books/appread',
        params: {id: $scope.id},
        responseType: 'json'
    }).then(function (res) {
        $scope.list = res.data;
        $scope.comment = res.data.shuping;
        $scope.shuqian = res.data.shuqian;
        $scope.biji = res.data.biji;
        $scope.xiangsi = res.data.xiangshishuji;

    });
    //点击添加到书架，传id，到取用户的最新阅读的那个表
    $scope.addself=function(shuid){
        $http({
            method:'get',
            url:hosturl+"app/addmybooks",
            params:{id:shuid},
            responseType: 'json'
        }).then(function(res){
        	$scope.suibian = res.data.data;
            $('.jiaru').css('display','block').delay(800).queue(function () {
                $(this).css('display','none').dequeue();
            });
        });
    }
   // 点赞也可以取消点赞
   // 点赞应该如何传递数据，传id
    $scope.clickzan=function(ids){
    //  $('#'+ids).toggleClass('zanx');
        $http({
            method: 'get',
            url: hosturl + 'app/appprise',
            params: {ids: ids,shuid:$scope.id},
            responseType: 'json'
        }).then(function (res) {
        	location.reload();
        });
    }
    var remarks = $(".remark-lists li")
    var schedual = $(".schedual-lists li")
    var notes = $(".notes-lists li")
    if (remarks.length == 0) {
        remarks.addClass("active")
        $(".all-remarks").text("暂无书评")
    }
    if (notes.length == 0) {
        remarks.addClass("active")
        $(".all-remarks").text("您还没有做笔记哦")
    }
    if (schedual.length == 0) {
        remarks.addClass("active")
        $(".all-remarks").text("您还没有做书签哦")
    }
    $scope.back = function () {
        history.back();
    };
    //获取相似书籍
    /*  var same=$http({
     url:hosturl+"books/appread?id="+$scope.examp+"&callback=JSON_CALLBACK",
     method:"JSONP"
     }).success(function(data){
     }).error(function(data){
     console.log('处理失败');
     })
     same.then(function (data) {
     $scope.same=data.data;
     })
     */

}])