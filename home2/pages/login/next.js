route.controller("NextCtrl", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.login = "找回密码";
    $scope.loginInput = ["输入您的密码", "再次输入密码"];

    //判断密码长度是否足够
    $('.register-password .psw1').blur(function () {
        var psw1 = $('.register-password .psw1').val();
        if(psw1.length<6){
            $('.register-alert').text('密码长度不够！');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
        if(psw1.length>12){
            $('.register-alert').text('密码长度过长！');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
    })
    //两次密码是否一致进行判断
    $('.register-password .psw2').blur(function () {
        var psw1 = $('.register-password .psw1').val();
        var psw2 = $('.register-password .psw2').val();
        if(psw1!==psw2){
            $('.register-alert').text('两次密码输入不一致！');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
    })

    //点击找回密码下
    $(".register-button").on("click", function () {
        //获取账号和密码
        var psw1 = $('.register-password .psw1').val();
        var psw2 = $('.register-password .psw2').val();

        //发送请求,判断用户是否存在
        var promise = $http({
            url: hosturl + "login/appuppwd",
            method: "post",
            data: {"psw1": "" + psw1 + "", "psw2": "" + psw2 + ""}
        }).success(function (data) {
            console.log(data);
            if (data.state == 1) {
                $('.register-alert').text(data.message);
                $('.register-alert')
                    .show()
                    .delay(2000)
                    .hide(0);
                setTimeout(function () {
                    location.href = "#/";
                }, 1000);
            } else {
                $('.register-alert').text('修改后密码不能同之前密码一致!');
                $('.register-alert')
                    .show()
                    .delay(2000)
                    .hide(0);
            }
        }).error(function (data) {
            console.log('错误!');
        });
        promise.then(function () {

        })
    })

}]);