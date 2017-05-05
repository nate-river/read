route.config(['$routeProvider', function ($routeProvider) {
   if(localStorage.user_data == "app"){
        $routeProvider
        .when('/', {
            templateUrl: "/book/home2/pages/bookCity/bookcity.html",
            controller: "BCCtrl"
        })
    }else {
       $routeProvider.when('/', {
          templateUrl: "/book/home2/pages/login/login.html",
          controller: "LoginCtrl"
       })
    };
    $routeProvider.when('/search', {
        templateUrl: "/book/home2/pages/shujia/search.html",
        controller: "SECtrl"
    }).when('/Myinfo', {
        templateUrl: "/book/home2/pages/wode/Myinfo.html",
        controller: "MyinfoCtrl"
    }).when('/book',{
        templateUrl: "/book/home2/pages/shujia/book.html",
        controller: "BookCtrl"
    })
    .when('/bookcity', {
        templateUrl: "/book/home2/pages/bookCity/bookcity.html",
        controller: "BCCtrl"
    })
    .when('/choose', {
        templateUrl: "/book/home2/pages/shujia/choose.html",
        controller: "CCtrl"
    }).when('/native', {
        templateUrl: "/book/home2/pages/shujia/native.html",
        controller: "NCtrl"
    }).when('/remark', {
        templateUrl: "/book/home2/pages/page/remark.html",
        controller: "RCtrl"
    }).when('/bangdan', {
            templateUrl: "/book/home2/pages/shujia/bangdan.html",
            controller: "BCtrl"
    }).when('/fenlei', {
        templateUrl: "/book/home2/pages/shujia/fenlei.html",
        controller: "FCtrl"
    }).when('/like', {
        templateUrl: "/book/home2/pages/shujia/like.html",
        controller: "LICtrl"
    }).when('/set', {
        templateUrl: "/book/home2/pages/wode/set.html",
        controller: "SCtrl"
    }).when('/favor', {
        templateUrl: "/book/home2/pages/wode/favor.html",
        controller: "FACtrl"
    }).when('/news', {
        templateUrl: "/book/home2/pages/wode/news.html",
        controller: "NCtrl"
    }).when('/advice', {
        templateUrl: "/book/home2/pages/wode/advice.html",
        controller: "ACtrl"
    }).when('/version', {
        templateUrl: "/book/home2/pages/wode/version.html",
        controller: "VCtrl"
    }).when('/information', {
        templateUrl: "/book/home2/pages/wode/information.html",
        controller:"ICtrl"
    }).when('/bind', {
        templateUrl: "/book/home2/pages/wode/bind.html",
        controller:"BindCtrl"
    }).when('/password', {
        templateUrl: "/book/home2/pages/wode/password.html",
        controller:"PCtrl"
    }).when('/remarks', {
        templateUrl: "/book/home2/pages/page/remarks.html",
        controller:"RECtrl"
    }).when('/schedual', {
        templateUrl: "/book/home2/pages/page/schedual.html",
        controller:"SCCtrl"
    }).when('/notes', {
        templateUrl: "/book/home2/pages/page/notes.html",
        controller:"NOCtrl"
    }).when('/issue', {
        templateUrl: "/book/home2/pages/page/issue.html",
        controller:"ISCtrl"
    }).when('/read', {
        templateUrl: "/book/home2/pages/read/read.html",
        controller:"ReadCtrl"
    })
    .when('/catalog', {
        templateUrl: "/book/home2/pages/read/catalog.html",
        controller:"CatalogCtrl"
    })
    .when('/write', {
        templateUrl: "/book/home2/pages/read/write.html",
        controller:"WriteCtrl"
    })
    .when('/shuqian', {
        templateUrl: "/book/home2/pages/read/shuqian.html",
        controller:"ShuqianCtrl"
    })
    .when('/biji', {
        templateUrl: "/book/home2/pages/read/biji.html",
        controller:"BijiCtrl"
    })
    .when('/forget', {
        templateUrl: "/book/home2/pages/login/forget.html",
        controller:"ForgetCtrl"
    }).when('/next', {
        templateUrl: "/book/home2/pages/login/next.html",
        controller:"NextCtrl"
    }).when('/register', {
        templateUrl: "/book/home2/pages/login/register.html",
        controller:"RegisterCtrl"
    })
}])


