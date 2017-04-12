route.controller("NOCtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    /*$(".notes-lists").on("touchstart","li",function(e){
     start = e.originalEvent.changedTouches[0].pageX
     $(this).on("touchmove",function(e){
     left = e.originalEvent.changedTouches[0].pageX
     move=start-left
     $(this).find(".move").css("left","-"+move+"px")
     $(this).find(".del").css("right",move+"px")
     $(this).on("touchend",function(e){
     if(move>100){
     $(this).find(".del").css("right",0)
     }
     })
     })
     })*/
    var start, left, flag;
    var bj = $("#sy-36 .biji .bij");

    bj.on("touchstart", "li", function (e) {
        start = e.originalEvent.changedTouches[0].pageX;
        flag = true;
    });

    bj.on('touchmove', "li", function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
        move = start - left;
        if ($(this).hasClass('shuqs')) {
            return null;
        } else {
            if (move > 30) {
                $(this).addClass('shuqs');
                $('<div class="sc"><span>x</span></div>').appendTo($(this));
                $(this).on('click', '.sc', function () {
                    $(this).parent().remove();
                })
            }
        }

    });
    $scope.id = $routeParams.id;
    $scope.search = $routeParams.search;
    $scope.examp = $routeParams.examp;
    //获取书评内容
    var notes = $http({
        url: hosturl + "book/booksnote?id=" + $scope.id,
        method: "get"
    }).success(function (data) {
        console.log(data);
    }).error(function (data) {
        console.log('处理失败');
    });
    notes.then(function (data) {
        $scope.notes = data.data;
    })


}]);