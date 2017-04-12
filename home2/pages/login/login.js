route.controller("LoginCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.login = "登陆"
    // $scope.user=[{name:"aa",psw:"1234"},{name:"bb",psw:"1234"}];

    //账号判断
    $('.login-user input').blur(function () {
        var zhanghao = $(this).val();
        if(zhanghao==""){
            $('.login-alert').text('请输入账号！');
            $('.login-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
        else if(!(zhanghao.length>5&&zhanghao.length<12)){
            $('.login-alert').text('请输入正确位数的账号！');
            $('.login-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
    })
    //判断密码长度是否足够
    $('.login-password input').blur(function () {
        var psw = $('.login-password input').val();
        if(!(psw.length>5&&psw.length<12)){
            $('.login-alert').text('请输入正确位数的密码！');
            $('.login-alert')
                .show()
                .delay(2000)
                .hide(0)
        }
    })

    //点击登录按钮发送请求,若账号密码同数据库相符,跳转另一页面
    $(".login-button").on("click", function () {
        //获取账号和密码
        var zhanghao = $(".zhanghao").val()
        var psw = $(".psw").val()

        //发送请求,判断用户是否存在
        var promise = $http({
            url: hosturl + "login/applogin",
            method: "POST",
            headers: "Content-Type': 'application/x-www-form-urlencoded",
            data: {accout: "" + zhanghao + "", password: "" + psw + ""}
        }).success(function (data) {
            if (data.state == 1) {
                $('.login-1 .login-bot .login-alert').text(data.name);
                $('.login-1 .login-bot .login-alert')
                    .show()
                    .delay(3000)
                    .hide(0)
                localStorage.user_data = "app";
                location.reload();
            } else {
                $('.login-1 .login-bot .login-alert').text(data.name);

                $('.login-1 .login-bot .login-alert')
                    .show()
                    .delay(1000)
                    .hide(0)
            }
        }).error(function (data) {
        })
        promise.then(function () {

        })
    })
    $scope.loginInput = ["输入您的学号/工号", "输入您的密码"]
    /*var promise=$http({
     url:"",
     method:"POST"
     }).success(function(data){
     if(data==='成功'){
     alert('data');
     }
     }).error(function(data){
     if(data==='')
     })

     //点击登录
     $scope.denglu=function(){

     }*/
}])