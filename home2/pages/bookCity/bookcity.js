route.controller("BCCtrl", ["$scope", "$routeParams","$http", function ($scope, $routeParams,$http) {
    localStorage.bianliang=1;
    localStorage.erji=0;
	$scope.book=function(){

    }
    localStorage.back='#/bookcity';
    var lcs=$('.lc-main');

    if(localStorage.active==0){
       lcs.each(function(i,v){
           if(i==0){
               $(this).addClass('active');
           }else{
               $(this).removeClass('active');
           }
       })
    }
    if(localStorage.active==1){
        lcs.each(function(i,v){
            if(i==1){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        })
    }
    if(localStorage.active==2){
        lcs.each(function(i,v){
            if(i==2){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        })
    }

    //轮播数据获取
    $scope.newarr=[];
    $scope.picss;
    //请求轮播图片数据
    $http({
        method: 'get',
        url: hosturl + 'app/appad'
    }).then(function (data) {
        $scope.picss=data.data;
        angular.forEach($scope.picss,function(v,i){
            $scope.newarr.push({'img':v.img,'id':v.books_id});
        })
    });
}])

route.directive('myXxk', [function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<div class="lc-nav"><div ng-transclude></div></div>',
        link:function ($scope, el) {
            $(function () {
                $('#lc-head .lis').on('touchend', function () {
                    $('#lc-head .showing').removeClass('active');
                    $(this).children('.showing').addClass('active');
                    $('.lc-main').removeClass('active');
                    var index = $(this).index();
                    $('.lc-main').eq(index).addClass('active');
                })
            })
        }
    }
}])


