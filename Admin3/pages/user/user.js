//删除部分
route.factory('userdel',['$http','$q',function($http,$q){
    var del={
        getDel:function(id){
            var deferred = $q.defer();
            $http.get(hosturl+'/user/delnum?id='+id)
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
//修改部分
route.factory('userchange',['$http','$q',function($http,$q){
    var change={
        getChange:function(id,names){
            var deferred = $q.defer();
            $http.get(hosturl+'/user/updatenum?id='+id+'&nickname='+names)
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
route.controller("userCtrl",['$scope','user','$http','$q','userdel','userchange',function($scope,user,$http,$q,del,change){
    user.getUser().then(function(data){
        $scope.userlist=data;
       /* $scope.list=[
            {
                id:1,
                name:'张珊',
                type:'普通用户',
                intime:'2013-01-01',
                calnum:'2016-01-01'

            },
            {
                id:2,
                name:'搜索',
                type:'普通用户',
                intime:'2013-01-01',
                calnum:'2016-01-01'

            }

        ];*/
        $scope.cur={};
        $scope.isShow=false;
        //点击删除按钮
        $scope.shanchu=function(id){
            del.getDel(id).then(function(data){
                $scope.userlist=data;
//                console.log($scope.lists);
               /* $scope.lists=$scope.lists.filter(function(v,i){
                    return v.id!=id;
                })*/
            })
            /*$scope.userlist=$scope.userlist.filter(function(v,i){
                return v.id!=id;
            })*/
        }
        //点击批量删除
        $scope.pldel=function(){
            var inputs=$('.checkbox1');
            inputs.each(function(i,v){
            	var aa=$(this).attr('id');
                if(v.checked){
                	 del.getDel(aa).then(function(data){
                         $scope.userlist=data; 
                         $('#checkbox')[0].checked=!$('#checkbox')[0].checked;
                     })
                
                  
        
                }
            })
            if($('#checkbox')[0].checked){
                $('#checkbox')[0].checked=!$('#checkbox')[0].checked;
            }
        }
        //点击全部删除
        $scope.alldel=function(){

            if($('#checkbox')[0].checked){
                //console.log(55);
                $scope.userlist=[];
                $('#checkbox')[0].checked=!$('#checkbox')[0].checked;
            }else{
                /*checkval.checked=!checkval.checked;*/
                return;
            }

        }
        //点击第一个选中
        $scope.check=function(){
            var inputs=$('.checkbox1');
            //console.log($('#checkbox'))
            if($('#checkbox')[0].checked){
                //console.log(1)
                inputs.each(function(i,v){
                    v.checked=true;
                })
            }else{
                inputs.each(function(i,v){
                    v.checked=false;
                })
            }
        }
//    点击下面列表中的复选框
        $scope.fuxuan=function(){
            var checkval=$('#checkbox')[0];
            var inputs=$('.checkbox1');
            for(var i=0;i<inputs.length;i++){

                if(inputs[i].checked==false){
                    checkval.checked=false;
                    break;
                }
            }
            if(i==inputs.length){
                checkval.checked=true;
            }
        }
//    点击修改
        $scope.xiugai=function(id){
            $scope.isShow=true;
            angular.forEach($scope.userlist,function(v,i){
                if(v.id==id){
                    $('#input-name').val($scope.userlist[i].nickname);
                    $('#input-type').val($scope.userlist[i].gradename);
                    $scope.cur=$scope.userlist[i];

                }
            })
        }
//    点击完成
        $scope.done=function(id){
            var names=$('#input-name').val();
            var type=$('#input-type').val();
            change.getChange(id,names).then(function(data) {
                //这里要返回的是修改的一条数据
               // console.log(data);
                $scope.cur = data;
                angular.forEach($scope.userlist, function (v, i) {
                    if (v.id == id) {
                        v= $scope.cur;
                       // console.log(v);
                        $scope.userlist[i]=v;
                       // console.log($scope.userlist);
                    }
                })
            })
            /*angular.forEach($scope.userlist,function(v,i){
                if(v.id==id){
                    $scope.cur.name=names;
                    $scope.cur.type=type;

                    $scope.userlist[i]=$scope.cur;

                }
            })*/
            $('#input-name').val('');
            $('#input-type').val('');
            $scope.isShow=false;

        }
    })
    $scope.quxiao=function(){
    	$scope.isShow=!$scope.isShow;
    }

}])