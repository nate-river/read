route.controller("loginCtrl",['$scope',"$http",function($scope,$http){
    var btn=$('.btn');
    var zhanghao=$('.user');
    var psw=$('.psw');
    var code=$('.code');
    btn.on('click',function () {
        var val1=zhanghao.val();
        var val2=psw.val();
        var val3=code.val();
        //提交账号密码后台进行判断
        var load = $http({
            url: hosturl + "/login/dologin?accout=" + val1+"&password="+val2+"&code="+val3 ,
            method: "get"
        }).success(function (data) {
            if(data.state==1){
                alert('登录成功！');
                location.href='#/home';
            }else{
                alert('请重新登录！！');
            }
        }).error(function (data) {

        });
    })
}])
route.directive('loginCtrl', function ($timeout) {
    return {
        restrict: "A",
        transclude: true,
        link: function ($scope, el) {

        }
    }
})
