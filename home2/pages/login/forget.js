route.controller("ForgetCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.login = "找回密码"
    $scope.loginInput = ["输入您的学号/工号", "输入您的姓名"]
    $scope.whenClick = function (url) {
        $location.path(url); //可读可写，参考文档
    }

    //前台账号验证
    //账号判断
    $('.register-user0').blur(function () {
        var zhanghao = $(this).val();
        if(zhanghao==""){
            $('.register-alert').text('请输入账号！');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
        else if(!(zhanghao.length>5&&zhanghao.length<12)){
            $('.register-alert').text('请输入正确位数的账号！');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
    })
    //姓名判断
    $('.register-user1').blur(function () {
        var name = $(this).val();
        if(name==""){
            $('.register-alert').text('请输入姓名！');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
    })

    //点击下一步发送请求
    $(".rightNow").on("click", function () {

        //获取账号/姓名/手机号
        var zhanghao = $(".register-user0").val();
        var name = $(".register-user1").val();
        var phone = $('.register-phone').find('input').val();
        //向后台发送对应的账号、姓名、手机号
        if(zhanghao==""&&name==""){
            $('.register-alert').text('请填写内容');
            $('.register-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
        var promise = $http({
            url: hosturl + 'login/apprest',
            method: "post",
            data: {zhanghao: "" + zhanghao + "", username: "" + name + "", phone: "" + phone + ""}
        }).success(function (data) {
            if (data.state == 1) {
                console.log(data.message);
                $('.register-alert').text(data.message);
                $('.register-alert')
                    .show()
                    .delay(2000)
                    .hide(0)
                setTimeout(function () {
                    location.href = "#/next";
                }, 1000);
            } else {
                console.log(data.message);
            }
        }).error(function (data) {
            console.log('错误!');
        })
        promise.then(function () {

        })
    })
}
])