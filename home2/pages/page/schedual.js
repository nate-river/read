route.controller("SCCtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    /*$(".schedual-lists").on("touchstart","li",function(e){
     start = e.originalEvent.changedTouches[0].pageX
     $(this).on("touchmove",function(e){
     left = e.originalEvent.changedTouches[0].pageX;
     move=start-left;
     $(this).find(".move").css("left","-"+move+"px")
     $(this).find(".del").css("right",move+"px")
     $(this).on("touchend",function(e){
     if(move>100){
     $(this).find(".del").css("right",0)
     }
     })
     })
     })*/

    $scope.id = $routeParams.id;

    var ids,start,left,move;
    $('#sy-35 .shuqian .shuq').on('touchstart', 'li', function (e) {
        ids = $(this).attr('id');
        start = e.originalEvent.changedTouches[0].pageX;
        //定义一个开关，避免多次创建元素
        $(this).on('touchmove', function (e) {
            left = e.originalEvent.changedTouches[0].pageX;
            /*move = start - left;
            if ($(this).hasClass('shuqs')) {
                return;
            } else {
                if (move > 30) {
                    //出现上下边框
                    $(this).addClass('shuqs');
                    var child = $(this).children();
                    //让左侧图标隐藏
                    $(this).find('.shuq-t').addClass('xs');
                    //创建shq-s标签
                    var shq = $('<div class="shq-s"></div>');
                    shq.appendTo($(this));
                    //将子元素插入到shq-s中
                    child.appendTo(shq);
                    //创建删除按钮并将其插入到li标签中
                    $('<div class="sc"><span id="sc">x</span></div>').appendTo($(this));
                    //点击删除按钮、删除对应的元素(同后台数据交互)
                    $(this).find('.sc').on('click', function (e) {
                        $(this).parent().remove();
                        // ids 与$scope.id;
                        $http({
                            method: 'get',
                            url: hosturl + 'user/delmymark?id=' + ids,
                            responseType: 'json'
                        }).then(function (res) {

                        });
                    })
                }
                else if (move < 0) {
                    console.log('依法治国！');
                }
                /!*else if(move<10){
                 console.log('小于');
                 //出现上下边框
                 $(this).removeClass('shuqs');
                 var child = $(this).children();
                 //让左侧图标隐藏
                 $(this).find('.shuq-t').removeClass('xs');
                 //创建shq-s标签
                 var shq = $('<div class="shq-s"></div>');
                 shq.remove($(this));
                 //将子元素插入到shq-s中
                 child.remove(shq);
                 //创建删除按钮并将其插入到li标签中
                 $('<div class="sc"><span id="sc">x</span></div>').remove($(this));
                 //点击删除按钮、删除对应的元素(同后台数据交互)
                 $(this).find('.sc').on('click', function (e) {
                 $(this).parent().remove();
                 })
                 }*!/
            }*/
        })
    })
    $('#sy-35 .shuqian .shuq').on('touchend','li',function (e) {
        move = start - left;
        if(move>80){
            //出现上下边框
            if($(this).hasClass('shuqs')){
                return;
            }else{
                $(this).addClass('shuqs');
                var child = $(this).children();
                //让左侧图标隐藏
                $(this).find('.shuq-t').addClass('xs');
                //创建shq-s标签
                var shq = $('<div class="shq-s"></div>');
                shq.appendTo($(this));
                //将子元素插入到shq-s中;
                child.appendTo(shq);
                //创建删除按钮并将其插入到li标签中
                $('<div class="sc"><span id="sc">x</span></div>').appendTo($(this));
                //点击删除按钮、删除对应的元素(同后台数据交互)
                $(this).find('.sc').on('click', function (e) {
                    $(this).parent().remove();
                    // ids 与$scope.id;
                    $http({
                        method: 'get',
                        url: hosturl + 'user/delmymark?id=' + ids,
                        responseType: 'json'
                    }).then(function (res) {

                    });
                })
            }
        }else if(move<0&&(Math.abs(move)>80)){
            $(this).removeClass('shuqs');
            $(this).find('.sc').remove();
        }
    })

    $scope.id = $routeParams.id;
    $scope.search = $routeParams.search;
    $scope.examp = $routeParams.examp;
    //这个地方需要一个user的id吧
    //获取书评内容
    var schedual = $http({
        url: hosturl + "user/mymark?id=" + $scope.id,
        method: "GET"
    }).success(function (data) {

    }).error(function (data) {
        console.log('处理失败');
    })
    schedual.then(function (data) {
        $scope.schedual = data.data;
    })

}])