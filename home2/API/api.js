route.value("user","me");
route.constant("userInfo",{name:'me',age:12});
route.factory('jing',['$http','$q',function($http,$q){
	var jing = {
      	getJing:function(){
	        var deferred = $q.defer();
	        $http.get(hosturl+'category/appnewadd')
	        .success(function(data){
				deferred.resolve(data);
	        }).error(function(data){
	          deferred.reject(data);
	        })
	        return deferred.promise;
        }
    }
    return jing;
}])

//榜单数据获取
route.factory('bang',['$http','$q',function($http,$q){
	var bang = {
      	getBang:function(){
	        var deferred = $q.defer();
	        $http.get(hosturl+'category/appexamplelist')
	        .success(function(data){
	          deferred.resolve(data);
	        }).error(function(data){
	          deferred.reject(data);
	        })
	        return deferred.promise;
        }
    }
    return bang;
}])


//分类管理数据获取
route.factory('lei',['$http','$q',function($http,$q){
	var lei = {
      	getLei:function(){
	        var deferred = $q.defer();
	        $http.get(hosturl+'category/appshowcategory')
	        .success(function(data){
	        	// console.log(data)
	          deferred.resolve(data);
	        }).error(function(data){
	          deferred.reject(data);
	        })
	        return deferred.promise;
      }
     
    }
    return lei;
}])
//榜单类别对应数据获取
/*route.factory('bangL',['$http','$q',function($http,$q){
	var bangL = {
      	getbangL:function(){
	        var deferred = $q.defer();
	        $http.get('/bangL')
	        .success(function(data){
	        	// console.log(data)
	          deferred.resolve(data);
	        }).error(function(data){
	          deferred.reject(data);
	        })
	        return deferred.promise;
      }
    }
    return bangL;
}])*/
//书架页面数据获取
/*route.factory('shujia',['$http','$q',function($http,$q){
	var shujia = {
		getShujia:function(){
			var deferred = $q.defer();
			$http.get(hosturl+'user/appmybook?callback=JSON_CALLBACK')
				.success(function(data){
					// console.log(data)
					deferred.resolve(data);
				}).error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}
	}
	return shujia;
}])*/
//获取用户信息
route.factory('choose',['$http','$q',function($http,$q){
	var choose = {
		getChoose:function(){
			var deferred = $q.defer();
			$http.get(hosturl+'user/appperson')
				.success(function(data){
					deferred.resolve(data);
				}).error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}
	}
	return choose;
}])

