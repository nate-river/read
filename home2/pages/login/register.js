route.controller("RegisterCtrl", ["$scope", "$http", function ($scope, $http) {
    /*前台判断*/
    //账号判断
    $('.register1').blur(function () {
        var zhanghao = $('.register-user .register1').val();
        if(zhanghao==""){
            $('.register-button').next().text('请输入账号！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }
        else if(zhanghao.length>0&&zhanghao.length<6){
            $('.register-button').next().text('学号/工号长度不够！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }
        else if (zhanghao.length>12){
            $('.register-button').next().text('学号/工号长度过长！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }

    })
    //姓名判断
    $('.register2').blur(function () {
        var name = $('.register-user .register2').val();
        if(name==""){
            $('.register-button').next().text('请输入姓名！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }
    })
    //判断密码长度是否足够
    $('.register3').blur(function () {
        var psw1 = $('.register-password .register3').val();
        if(psw1.length<6){
            $('.register-button').next().text('密码长度不够！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }
        if(psw1.length>12){
            $('.register-button').next().text('密码长度过长！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }
    })
    //两次密码是否一致进行判断
    $('.register4').blur(function () {
        var psw1 = $('.register-password .register3').val();
        var psw2 = $('.register-password .register4').val();
        if(psw1!==psw2){
            $('.register-button').next().text('两次密码输入不一致！');
            $('.register-button').next()
                .show()
                .delay(2000)
                .hide(0)
        }
    })


    //点击立即注册
    $(".register-button").on("click", function () {
        var zhanghao = $('.register-user .register1').val();
        var name = $('.register-user .register2').val();
        var psw1 = $('.register-password .register3').val();
        var psw2 = $('.register-password .register4').val();
        //发送请求,判断用户是否存在
        var promise = $http({
            url: hosturl + "login/appregister",
            method: "post",
            data: {
                "zhanghao": "" + zhanghao + "",
                "name": "" + name + "",
                "psw1": "" + psw1 + "",
                "psw2": "" + psw2 + ""
            }
        }).success(function (data) {
            console.log(data);
        }).error(function (data) {
            console.log('错误!');
        });
        promise.then(function (data) {
            if (data.data.state == 1) {
                $('.register-button').next().text(data.data.message);
                $('.register-button').next()
                    .show()
                    .delay(2000)
                    .hide(0)
                setTimeout(function () {
                    location.href = "#/";
                }, 1000);
            } else {
                console.log(data.data.message);
                $('.register-button').next().text(data.data.message);
                $('.register-button').next()
                    .show()
                    .delay(2000)
                    .hide(0)
            }
        })
    })

}])