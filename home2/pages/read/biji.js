route.controller("BijiCtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;
    $scope.search = $routeParams.search;
    $scope.examp = $routeParams.examp;
    $(".mark").removeClass("active");
    $(".mynote").addClass("active");
    $(".mulu").removeClass("active");

    $scope.back = function () {
        history.back();
    }
    //这是笔记的请求
    var biji = $http({
        url: hosturl + "user/appnote?id=" + $scope.id,
        method: "get"
    }).success(function (data) {
        // console.log(data);
    }).error(function (data) {
        console.log('处理失败');
    })
    biji.then(function (data) {
        /*$scope.ribang=data;*/
        $scope.biji = data.data;
    })

    $('.g-node-inner').on('touchstart','li', function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
    })
    $('.g-node-inner').on('touchend','li', function (e) {
        var n = e.originalEvent.changedTouches[0].pageX;
    })
    $(".g-node-inner").on('touchmove','li', function (e) {
        var n = e.originalEvent.changedTouches[0].pageX;
        var x = n - left;
        if (x > 0) {
            /* $(this).css('transition', 'transform 0.8s ease');
             $(this).css('transform', 'translate3d(0px,0,0)');*/
            $(this).find('.bigbox').css('display', 'block');
            $(this).find('.bigbox2').css('display', 'none');
        } else if (x < 0) {
            /*   $(this).css('transition', 'transform 0.8s ease');
             $(this).css('transform', 'translate3d(-50px,0,0)');*/
            $(this).find('.bigbox').css('display', 'none');
            $(this).find('.bigbox2').css('display', 'block');
        }
        $scope.ids=$(this).find('.cha').attr('id');
        $(this).on('click','.cha',function () {
            $(this).parents('li').remove();
        })
    })
    // 这是点击删除，传一个id来删除笔记
    $('.g-node-inner').on('click','.cha',function (e) {
        
    })

    $scope.shanchu = function() {
        //再加一个书的id $scope.id
        var del = $http({
            url: hosturl + "user/delmynote?id=" + $scope.ids,
            method: "get"
        }).success(function (data) {

        }).error(function (data) {
            console.log('处理失败');
        })
        del.then(function (data) {
            $scope.shanchu = data;
        })
    }
}])
route.directive('ngX', [function () {
    return {
        restrict: "A",
        template: "<div><div ng-transclude></div></div>",
        replace: true,
        transclude: true,
        link: function ($scope, el) {
            $(".zhengwen").on('touchend', function () {
                $('#header').toggle();
            })
            $(".zhengwen").on('touchend', function () {
                $('#end').toggle();
            })
            $(".circles2").on('touchend', function () {
                $('#s-43').show();
            })
            $(".zhengwen").on('touchend', function () {
                $('#s-43').hide();
            })
            $(".circles3").on('touchend', function () {
                $('#s-44').show();
            })
            $(".zhengwen").on('touchend', function () {
                $('#s-44').hide();
            })
            $(this).on('click', function () {

            })
        }
    }
}])