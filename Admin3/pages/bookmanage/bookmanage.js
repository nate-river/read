//删除
route.factory('bookdel',['$http','$q',function($http,$q){
    var del={
        getDel:function(id){
            var deferred = $q.defer();
            $http.get(hosturl+'/books/delbook?id='+id)
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
route.factory('bookadd',['$http','$q',function($http,$q){
    var add={
        getAdd:function(name,autor,textinner){
            var deferred = $q.defer();
            $http.get(hosturl+'/books/addnum?id='+id)
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
route.factory('bookchange',['$http','$q',function($http,$q){
    var change={
        getChange:function(id,names){
            var deferred = $q.defer();
            $http.get(hosturl+'/books/updatenum?id='+id)
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


route.controller("bookmanageCtrl",['$scope','bookmanage','booklist','$http','$q','bookdel','bookadd','bookchange', function($scope,bookmanage,booklist,$http,$q,bookdel,bookadd,bookchange){
    bookmanage.getManage().then(function(data){
        $scope.isShow=false;
        $scope.books=data;

        //点击添加图书完成
        $scope.done=function(){
            id=$scope.books.length+1;
            var name=$('#bookmanage .bs-example ').find('.input-name').val();
            //console.log(name)
            var autor=$('#bookmanage .bs-example ').find('.input-autor').val();
            var textinner=$('#bookmanage .bs-example ').find('.text-inner').val();
            //console.log($('#tj'))
            if($('#tj')[0].checked){
            	var status=1;
            	//console.log(5555);
            }else{
            	var status=0;
            	//console.log(0)
            }
           /* bookadd.getAdd(name,autor,textinner,status).then(function(data){
                //这里要返回所有数据
               $scope.books.push(data);
            })*/
            $('.addbook ').css('display','none');
        }
        //点击添加图书
        $scope.add=function(){
            $('.addbook ').css('display','block');
            $('#bookmanage .bs-example ').find('.input-name').val('');
            $('#bookmanage .bs-example ').find('.input-autor').val('');
            $('#bookmanage .bs-example ').find('.text-inner').val('');
        }
//    点击删除键删除
        $scope.remove=function(id){
            bookdel.getDel(id).then(function(data){
                //这里要返回所有数据
                $scope.books =data;
            })

        }
        var aa=true;
        //让所有的都选中
        $scope.allcheck=function(){
            var checkval=$('#all-check')[0];
            var inputs=$('.fuxuan').find('input');

            if(checkval.checked){
                inputs.each(function(i,v){
                    v.checked=true;
                })

            }else{
                inputs.each(function(i,v){
                    v.checked=false;
                })

            }

        }
        $scope.arr=[];
        //点击每个选框，全选的框去掉对勾
        $scope.fuxuan=function(){
            var checkval=$('#all-check')[0];
            var inputs=$('.fuxuan').find('input');
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
        //全部删除
        $scope.alldel=function(){
            // $('#all-check').checked=true
            var checkval=$('#all-check')[0];
            if(checkval.checked){
             
                bookdel.getDel().then(function(data){
                    //这里要返回所有数据
                    $scope.books =[];
                })
                checkval.checked=!checkval.checked;
            }else{
                /*checkval.checked=!checkval.checked;*/
                return;
            }
        }
//    批量删除
        $scope.notalldel=function(){
        	var checkval=$('#all-check')[0];
            var inputs=$('.fuxuan').find('input');
            inputs.each(function(i,v){
                if(v.checked==true){
                    id=$(this).closest('tr').attr('data-id');
                   
                    bookdel.getDel(id).then(function(data){
                        //这里要返回所有数据
                        $scope.books =data;
                    })
                  
                   // console.log($scope.books)
                }
                
            })
            if(checkval.checked){
               
                checkval.checked=!checkval.checked;
            }
        }
//    点击修改
        $scope.xiugai=function(id){
            $('.mask-bookmanage .input-name').val('');
            $('.mask-bookmanage .input-autor').val('');
            $scope.isShow=true;
            angular.forEach($scope.books,function(v,i){
                if(v.id==id){
                    //console.log(i);
                    $scope.cur=$scope.books[i];
                    $('.mask-bookmanage .input-name').val($scope.cur.name);
                    $('.mask-bookmanage .input-autor').val($scope.cur.autor);
                }
            })
        }
//    点击修改之后完成
        $scope.xiugaidone=function(){

            /* name=$('.mask-bookmanage .input-name').val();
             autor=$('.mask .input-autor').val();
             var id=$('.mask .input-name').attr('data-id');*/
            name=$('.mask-bookmanage .input-name').val();
            autor=$('.mask-bookmanage .input-autor').val();
            var id=$('.mask-bookmanage .input-name').attr('data-id');
            change.getChange(id,name).then(function(data){
                angular.forEach($scope.books,function(v,i){
                    if(v.id==id){
                        v=data;
                        $scope.books[i]=v;
                       // console.log($scope.books[i])
                    }
                })
            })

            $scope.isShow=false;
            $scope.cur={};
            $('.mask .input-name').val('');
            $('.mask .input-autor').val('');
        }


    });
$scope.quxiao=function(){
	$scope.isShow=!$scope.isShow;
}
$scope.quxiao2=function(){
	 $('.addbook ').css('display','none');
}


booklist.getList().then(function(data){
	$scope.liandong=data;
	//console.log(data);
	//console.log('联动');
	// 创建省份
    var str="<option>一级分类</option>";
    var str1="<option>二级分类</option>";
    var str2="<option>三级分类</option>";
    var str4="<option>一级分类</option>";
    var str5="<option>二级分类</option>";
    var str6="<option>三级分类</option>";
    for(var i=0;i<$scope.liandong.length;i++){
        str+="<option value="+$scope.liandong[i].id+">"+$scope.liandong[i].name+"</option>";
        str4+="<option value="+$scope.liandong[i].id+">"+$scope.liandong[i].name+"</option>";
    }

    var  select1=$('#select1');
    var  select2=$('#select2');
    var  select3=$('#select3');
    var  select4=$('#select4');
    var  select5=$('#select5');
    var  select6=$('#select6');
    $(str).appendTo($('#select1'))
    $(str4).appendTo($('#select4'));
    // 创建对应地级市
    $('#select1').on('change',function(){
        var ii=$('#select1')[0].selectedIndex;
        //console.log(ii);
        // 再一次改变内容时将str1清空
             $('#select2').find('option').remove();

        str1="<option>二级分类</option>";
        for(var i=0;i<$scope.liandong[ii-1].erji.length;i++){
            str1+="<option value="+$scope.liandong[ii-1].erji[i].id+">"+$scope.liandong[ii-1].erji[i].name+"</option>";
        }

        $(str1).appendTo($('#select2'));
        // 创建市、县级市
        $('#select2').on('change',function(){
            var kk=$('#select2')[0].selectedIndex;
            // 再一次改变内容时将str2清空
            $('#select3').find('option').remove();
            str2="<option>三级分类</option>";
            //console.log(kk);
            var areas=$scope.liandong[ii-1].erji[kk-1].sanji;
            if($scope.liandong[ii-1].erji[kk-1].sanji){
            	 for(var i=0;i<areas.length;i++){
                     str2+="<option value="+areas[i].id+">"+areas[i].name+"</option>";
                 }
            }else{
            	return;
            }
            
           
            $(str2).appendTo($('#select3'));
        })

    })
    $('#select4').on('change',function(){
        var ii=$('#select4')[0].selectedIndex;
        //console.log(ii);
        // 再一次改变内容时将str1清空
        $('#select5').find('option').remove();

        str5="<option>二级分类</option>";
        for(var i=0;i<$scope.liandong[ii-1].erji.length;i++){
            str5+="<option  value="+$scope.liandong[ii-1].erji[i].id+">"+$scope.liandong[ii-1].erji[i].name+"</option>";
        }
        $(str5).appendTo($('#select5'));
        // 创建市、县级市
        $('#select5').on('change',function(){
            var kk=$('#select5')[0].selectedIndex;
            // 再一次改变内容时将str2清空
            $('#select3').find('option').remove();
            str6="<option>三级分类</option>";
          
            var areas=$scope.liandong[ii-1].erji[kk-1].sanji;
            if($scope.liandong[ii-1].erji[kk-1].sanji){
              	 for(var i=0;i<areas.length;i++){
              		 str6+="<option value="+areas[i].id+">"+areas[i].name+"</option>";
                   }
              }else{
              	return;
              }
          
            $(str6).appendTo($('#select6'));
        })

    })
});


}])
