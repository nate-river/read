var route = angular.module("reader", ['ngRoute']);
// var cookies= angular.module('reader', ['ngCookies']);
var hosturl = "/book/index.php/home/";
var boot    = "/dushu";
/*本地存储的内容*/
//阅读时间提醒存储
localStorage.tixing;
//启动下次阅读存储
localStorage.qidong;
//回退按钮存储
localStorage.back;
localStorage.active=0;
//榜单状态栏存储
localStorage.bianliang=1;
localStorage.erji=0;
//性别存储
localStorage.sex;
//目录本地存储
localStorage.bian;
//背景色
localStorage.bgcolor;
//背景图片
localStorage.bgImg;
//前景色
localStorage.forcolor;
//颜色块下标
localStorage.index;
//阅读进度
localStorage.progress;
//阅读页数
localStorage.page;
//轮播图片存放地址
//存储字号
localStorage.word;
localStorage.picss;
route.controller("main", ["$scope","jing", "bang", "lei",  "choose", function ($scope,jing,  bang, lei,  choose) {
   $scope.zongtext;
        $scope.arr = [];
    $scope.arr1 = [];
    $scope.tixing;
    //书城页面数据获取
    jing.getJing().then(function (data) {
        $scope.jing = data;
    }, function () {
        $scope.jing = []; //处理错误
        console.log('faile')
    });

    //榜单数据获取
    bang.getBang().then(function (data) {
        $scope.bang = data;
    }, function () {
        $scope.bang = []; //处理错误
        console.log('faile')
    });

    //分类管理数据获取
    lei.getLei().then(function (data) {
        $scope.lei = data;
    }, function () {
        $scope.lei = []; //处理错误
        console.log('faile')
    });
    $scope.index = 0;
    $scope.reade = false;
    $scope.get = function (index) {
        $scope.index = index;
    }
    //获取用户信息
    $scope.choose;
    choose.getChoose().then(function (data) {
        $scope.choose = data;
        localStorage.sex=$scope.choose.gender;
    }, function () {
        $scope.choose = []; //处理错误
        console.log('faile')
    });
}])


route.directive("lContent", [function () {

}])

