route.factory('bang',['$http','$q',function($http,$q){
    var bang = {
        getBang:function(){
            var deferred = $q.defer();
            $http.get(hosturl+'/example/listall')
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
route.factory('user',['$http','$q',function($http,$q){
    var user = {
        getUser:function(){
            var deferred = $q.defer();
            $http.get(hosturl+'/user/userlist')
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
route.factory('booklist',['$http','$q',function($http,$q){
    var booklist = {
        getList:function(){
            var deferred = $q.defer();
            $http.get(hosturl+'/category/listall')
                .success(function(data){
                    // console.log(data)
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return booklist;
}])

route.factory('bookmanage',['$http','$q',function($http,$q){
    var bookmanage = {
        getManage:function(){
            var deferred = $q.defer();
            $http.get(hosturl+'/books/showbooks')
                .success(function(data){
                    // console.log(data)
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return bookmanage;
}])
