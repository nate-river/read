route.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: boot+"/Admin3/pages/login/login.html",
        controller:"loginCtrl"
    }).when('/home', {
        templateUrl: boot+"/Admin3/pages/home/home.html",
        controller:"homeCtrl"
    }).when('/user', {
        templateUrl: boot+"/Admin3/pages/user/user.html",
        controller:"userCtrl"
    }).when('/booklist', {
        templateUrl: boot+"/Admin3/pages/booklist/booklist.html",
        controller:"booklistCtrl"
    }).when('/bookmanage', {
        templateUrl: boot+"/Admin3/pages/bookmanage/bookmanage.html",
        controller:"bookmanageCtrl"
    }).when('/bangdan', {
        templateUrl: boot+"/Admin3/pages/bangdan/bangdan.html",
        controller:"bangdanCtrl"
    })
}])


