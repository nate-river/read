//删除
route.factory('del',['$http','$q',function($http,$q){
    var del={
        getDel:function(id){
            var deferred = $q.defer();
            $http.get(hosturl+'/example/delnum?id='+id)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return del;
}])

//添加
route.factory('add',['$http','$q',function($http,$q){
    var add={
        getAdd:function(names,rule,detail,brief){
            var deferred = $q.defer();
            $http.get(hosturl+'/example/addnum?name='+names+'&rule='+rule+"&detail="+detail+"&brief="+brief)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return add;
}])

//修改
route.factory('change',['$http','$q',function($http,$q){
    var change={
        getChange:function(id,names,rule,detail,brief){
            var deferred = $q.defer();
            $http.get(hosturl+'/example/updatenum?id='+id+'&name='+names+'&rule='+rule+"&detail="+detail+"&brief="+brief)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
    return change;
}])

route.controller("bangdanCtrl", ['$scope','bang','$http','$q','del','add','change', function ($scope,bang,$http,$q,del,add,change) {
    bang.getBang().then(function(data){
        $scope.lists=data;
        // console.log($scope.lists);
        $scope.curs;
        $scope.cur;
        $scope.isshow=false;
        $scope.isShow=false;
        //点击删除
        $scope.del=function(id){
            del.getDel(id).then(function(data){
                $scope.lists=data;
                $scope.lists=$scope.lists.filter(function(v,i){
                    return v.id!=id;
                })
            })
        }
        // 点击添加 榜单
        $scope.add=function(){
            $('.masks .juzhong .input-bangdanname').val('');
            var len=$scope.lists.length+1;
            $scope.isshow=true;
            $scope.cur={
                id:len,
                name:''
            }

        }
        //点击添加完成
        $scope.alldone=function(id){
            var names=$('.masks .juzhong .input-bangdanname').val();
            var rule=$('.masks .juzhong .input-rule').val();
            var brief=$('.masks .juzhong .input-brief').val();
            var detail=$('.masks .juzhong .input-detail').val();
            add.getAdd(names).then(function(data){
                //这里要返回所有数据
                $scope.cur=data;
                $scope.lists.push($scope.cur);
                $scope.cur={};
                $scope.isshow=false;
                $('.masks .juzhong .input-bangdanname').val('');
            })


        }
        //点击修改
        $scope.change=function(id){
            $('.mask .juzhong .input-bangdanname').val('');
            $('.mask .juzhong .input-id').val('');
            $scope.isShow=true;
            angular.forEach($scope.lists,function(v,i){
                if(v.id==id){
                    $('.mask .juzhong .input-bangdanname').val(v.name);
                    $('.mask .juzhong .input-id').val(v.id);
                    $scope.curs={
                        id:id,
                        name:v.name
                    }
                }
            })
        }

        //修改完成之后，点击完成
        $scope.done=function(id){
            var name=$('.mask .juzhong .input-bangdanname').val();
            change.getChange(id,name).then(function(data){
                //这里要返回的是修改的一条数据
                $scope.cur=data;
                angular.forEach($scope.lists,function(v,i){
                	if(v.id==id){
                		$scope.lists[i]=$scope.cur;
                	}
                })
                //$scope.lists[id-1]=$scope.cur;
                // $scope.lists.push($scope.cur);
                $scope.curs={};
                $scope.isShow=false;
                $('.mask .juzhong .input-bangdanname').val('');
            })
        }
    })

//  弹出的界面
    $scope.quxiao=function(){
    	$scope.isShow=!$scope.isShow;
    }
$scope.quxiao2=function(){
	$scope.isshow=!$scope.isshow;
    }

}])

