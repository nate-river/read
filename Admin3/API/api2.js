route.factory('user',['$http','$q',function($http,$q){
	var user = {
			getUser:function(){
				var deferred = $q.defer();
				$http.get('http://localhost/uek-tushu/index.php/admin/user/userlist')
				.success(function(data){
					// console.log(data)
					deferred.resolve(data);
				}).error(function(data){
					deferred.reject(data);
				})
				return deferred.promise;
			}
	}
	return user;
}])
route.factory('bang',['$http','$q',function($http,$q){
    var bang = {
        getBang:function(){
            var deferred = $q.defer();
            $http.get('http://localhost/uek-tushu/index.php/admin/example/listall')
                .success(function(data){
                    // console.log(data)
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return bang;
}])
//删除
/*route.factory('del',['$http','$q',function($http,$q){
    var del={
        getDel:function(){
            var deferred = $q.defer();
            $http.get('http://localhost/uek-tushu/index.php/admin/example/delnum?id='+id)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return del;
}])*/

//添加
/*route.factory('add',['$http','$q',function($http,$q){
    var add={
        getDel:function(){
            var deferred = $q.defer();
            $http.get('index.php?name='+names)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return add;
}])*/