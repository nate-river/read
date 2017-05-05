route.config(['$routeProvider', function ($routeProvider) {
   if(localStorage.user_data == "app"){
        $routeProvider
        .when('/', {
            templateUrl: "home2/pages/bookCity/bookcity.html",
            controller: "BCCtrl"
        })
    }else {
       $routeProvider.when('/', {
          templateUrl: "/book/home2/pages/login/login.html",
          controller: "LoginCtrl"
       })
    };
    $routeProvider.when('/search', {
        templateUrl: "home2/pages/shujia/search.html",
        controller: "SECtrl"
    }).when('/Myinfo', {
        templateUrl: "home2/pages/wode/Myinfo.html",
        controller: "MyinfoCtrl"
    }).when('/book',{
        templateUrl: "home2/pages/shujia/book.html",
        controller: "BookCtrl"
    })
    .when('/bookcity', {
        templateUrl: "home2/pages/bookCity/bookcity.html",
        controller: "BCCtrl"
    })
    .when('/choose', {
        templateUrl: "home2/pages/shujia/choose.html",
        controller: "CCtrl"
    }).when('/native', {
        templateUrl: "home2/pages/shujia/native.html",
        controller: "NCtrl"
    }).when('/remark', {
        templateUrl: "home2/pages/page/remark.html",
        controller: "RCtrl"
    }).when('/bangdan', {
            templateUrl: "home2/pages/shujia/bangdan.html",
            controller: "BCtrl"
    }).when('/fenlei', {
        templateUrl: "home2/pages/shujia/fenlei.html",
        controller: "FCtrl"
    }).when('/like', {
        templateUrl: "home2/pages/shujia/like.html",
        controller: "LICtrl"
    }).when('/set', {
        templateUrl: "home2/pages/wode/set.html",
        controller: "SCtrl"
    }).when('/favor', {
        templateUrl: "home2/pages/wode/favor.html",
        controller: "FACtrl"
    }).when('/news', {
        templateUrl: "home2/pages/wode/news.html",
        controller: "NCtrl"
    }).when('/advice', {
        templateUrl: "home2/pages/wode/advice.html",
        controller: "ACtrl"
    }).when('/version', {
        templateUrl: "home2/pages/wode/version.html",
        controller: "VCtrl"
    }).when('/information', {
        templateUrl: "home2/pages/wode/information.html",
        controller:"ICtrl"
    }).when('/bind', {
        templateUrl: "home2/pages/wode/bind.html",
        controller:"BindCtrl"
    }).when('/password', {
        templateUrl: "home2/pages/wode/password.html",
        controller:"PCtrl"
    }).when('/remarks', {
        templateUrl: "home2/pages/page/remarks.html",
        controller:"RECtrl"
    }).when('/schedual', {
        templateUrl: "home2/pages/page/schedual.html",
        controller:"SCCtrl"
    }).when('/notes', {
        templateUrl: "home2/pages/page/notes.html",
        controller:"NOCtrl"
    }).when('/issue', {
        templateUrl: "home2/pages/page/issue.html",
        controller:"ISCtrl"
    }).when('/read', {
        templateUrl: "home2/pages/read/read.html",
        controller:"ReadCtrl"
    })
    .when('/catalog', {
        templateUrl: "home2/pages/read/catalog.html",
        controller:"CatalogCtrl"
    })
    .when('/write', {
        templateUrl: "home2/pages/read/write.html",
        controller:"WriteCtrl"
    })
    .when('/shuqian', {
        templateUrl: "home2/pages/read/shuqian.html",
        controller:"ShuqianCtrl"
    })
    .when('/biji', {
        templateUrl: "home2/pages/read/biji.html",
        controller:"BijiCtrl"
    })
    .when('/forget', {
        templateUrl: "home2/pages/login/forget.html",
        controller:"ForgetCtrl"
    }).when('/next', {
        templateUrl: "home2/pages/login/next.html",
        controller:"NextCtrl"
    }).when('/register', {
        templateUrl: "home2/pages/login/register.html",
        controller:"RegisterCtrl"
    })
}])


