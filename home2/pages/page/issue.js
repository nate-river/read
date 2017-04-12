route.controller("ISCtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;
    $scope.search = $routeParams.search;
    $scope.examp = $routeParams.examp;
    $('#fabu').on('click', function () {
        //获取书评内容
        $('#textarea')[0].disabled=true;
        var aa = $('#textarea').val();
        var issue = $http({
            url: hosturl + "books/appaddcomment",
            method: "post",
            data: {"content": "" + aa + "", "bookid": "" + $scope.id + ""}
        }).success(function (data) {

        }).error(function (data) {
            console.log('处理失败');
        });
        issue.then(function (data) {
            $scope.issue = data.data;
            $('.zhezhao').removeClass('zhezhaos');
            $('.tc').css('display', 'none');
        })

    });
    $('.fabu').on('click', function () {
        $('.zhezhao').addClass('zhezhaos');
        $('.tc').css('display', 'block');
        $('#textarea')[0].disabled=true;
    });
    $('#cel').on('click', function () {
        $('.zhezhao').removeClass('zhezhaos');
        $('.tc').css('display', 'none');
        $('#textarea')[0].disabled=false;

    })


}]);