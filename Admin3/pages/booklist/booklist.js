route.factory('booklistdel',['$http','$q',function($http,$q){
    var del={
        getDel:function(id){
            var deferred = $q.defer();
            $http.get(hosturl+'/category/delnum?id='+id)
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
route.factory('booklistadd',['$http','$q',function($http,$q){
    var add={
        getAdd:function(names,id){
            var deferred = $q.defer();
            $http.get(hosturl+'/category/addnum?name='+names+'&pid='+id)
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
route.factory('booklistchange',['$http','$q',function($http,$q){
    var change={
        getChange:function(id,names){
            var deferred = $q.defer();
            $http.get(hosturl+'/category/updatenum?id='+id+'&name='+names)
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


route.controller("booklistCtrl", ['$scope','booklist','$http','$q','booklistdel','booklistadd','booklistchange', function ($scope,booklist,$http,$q,booklistdel,booklistadd,booklistchange) {
    booklist.getList().then(function(data){
        $scope.listss =data;
        $scope.xianshi=false;
        $scope.xianshi1=false;
        $scope.xianshi2=false;
        $scope.xianshi3=false;
        $scope.xianshi22=false;
        $scope.xianshi33=false;
        $scope.curcon;
        $scope.listwo;
        $scope.lissan;
        $scope.arr=[];
        //这是添加分类对象
        $scope.addcur;
        //这是添加二级分类的对象
        $scope.addtwocur;
        //这是添加三级分类的对象
        $scope.addsancur;

        //遍历 $scope.listss，获取id，放到数组当中
        angular.forEach($scope.listss,function(v,i){
            $scope.arr.push(v.id*1);

            $scope.listwo=v.erji;
            angular.forEach($scope.listwo,function(ve,ie){
                $scope.arr.push(ve.id*1);
                $scope.lissan=ve.sanji;
                angular.forEach($scope.lissan,function(k,j){
                    $scope.arr.push(k.id*1);
                })
            })
        })

        //删除一级标签
        $scope.fenlistdel=function(id){
            //console.log(id);
            booklistdel.getDel(id).then(function(data){
                $scope.listss=data;
            })
           /* $scope.listss=$scope.listss.filter(function(v,i){
                return v.id!=id;
            })*/
        }
        //删除二级标签
        $scope.erjidel=function(pid,id){
          
            booklistdel.getDel(id).then(function(data){
                $scope.listss=data;
            })
        }
        //删除三级标签
        $scope.snajidel=function(gid,pid,id){
          
            booklistdel.getDel(id).then(function(data){
                $scope.listss=data;
            })
        }
        //修改
        /* $('#booklist').on('click','.change',function(){
         var text=$(this).parent().prev().text();
         $(this).parent().prev().text('');
         var input=$('<input class="" style="text-align:left;">');
         input.attr('value',''+text+'');
         input.appendTo($(this).parent().prev());
         //将input光标置于末端

         //获取焦点
         input.focus().val(text);
         //失去焦点
         input.blur(function(){
         var val=input.val();
         var td=$(this).parent();
         $(this).remove();
         td.text(''+val+'');
         })
         return false;
         })*/
        //增加 点击添加分类
        $scope.add1=function(){
            $scope.xianshi1=true;
            // 找到数组中的最大值
            var  max=Math.max.apply(null, $scope.arr)+1;
            //console.log(max);
            $('.mask-booklist-fenlei .input-booklistname').val('');
            $scope.addcur={
                id:max,
                name:'',
                parentid:'0',
                erji:[]
            }
            $scope.arr.push(max);
        }
        //添加分类之后，点击完成
        $scope.fenleidone=function(){
            var names=$('.mask-booklist-fenlei .input-booklistname').val();
            booklistadd.getAdd(names).then(function(data){
                //这里要返回所有数据
                console.log(data);
                $scope.addcur=data;
                $scope.listss.push($scope.addcur);
                $scope.addcur={};
                $scope.xianshi1=false;
                $('.mask-booklist-fenlei .input-booklistname').val('');
            })
        }
        //点击添加二级子分类
        $scope.adderjilist=function(ids){
            $scope.xianshi2=true;
            // 找到数组中的最大值
            var  max=Math.max.apply(null, $scope.arr)+1;
            $('.mask-booklist-erji .input-booklistname').val('');

            $scope.addtwocur={
                id:max,
                name:'',
                parentid:ids,
                sanji:[]
            }
            $scope.arr.push(max);
          
        }
        //添加二级分类之后，点击完成
        //这个地方的问题是，展开之后点击添加有的添加不到页面中。
        $scope.erjidone=function(){
            var names=$('.mask-booklist-erji .input-booklistname').val();
            // console.log(names)
            $scope.addtwocur.name=names;
            angular.forEach($scope.listss,function(v,i){
                if(v.id==$scope.addtwocur.parentid){
                    booklistadd.getAdd(names,$scope.addtwocur.parentid).then(function(data){
                        //这里要返回所有数据
                       /* console.log(data);
                        $scope.addtwocur=data;
                        v=data;*/
//                        v.erji.push($scope.addtwocur);
                        $scope.listss=data;
                        // $scope.listss.erji.push(v);
                        // $scope.lists.push($scope.cur);
                       
                        //console.log($('#'+$scope.addtwocur.id));
                        if( $('#'+$scope.addtwocur.id).parent().prev().hasClass('active')){
                            $('#'+$scope.addtwocur.id).parent().addClass('active');
                        }else{
                            $('#'+$scope.addtwocur.id).parent().removeClass('active');
                            //console.log('我们')
                        }
                        $scope.addtwocur={};
                    })
                  
                }
            })
            $('.mask-booklist-erji .input-booklistname').val();
            $scope.xianshi2=false;

        }
        //点击添加三级分类
        $scope.addsanjilist=function(pid,id){
            $scope.xianshi3=true;
            $('.mask-booklist-sanji .input-booklistname').val('');
            // 找到数组中的最大值
            //console.log(pid,id);
            var  max=Math.max.apply(null, $scope.arr)+1;
            $scope.addsancur={
                id:max,
                name:'',
                parentid:id,
                grandid:pid
            }
            $scope.arr.push(max);
        }
        //添加三级分类之后，点击完成
        $scope.sanjidone=function(){
            var names=$('.mask-booklist-sanji .input-booklistname').val();
            //console.log(names)
            $scope.addsancur.name=names;
            angular.forEach($scope.listss,function(v,i){
                if(v.id==$scope.addsancur.grandid){
                    $scope.three=v.erji;
                    angular.forEach($scope.three,function(vt,it){
                        if(vt.id==$scope.addsancur.parentid){
                            console.log(vt.sanji);
                            booklistadd.getAdd(names,$scope.addsancur.parentid).then(function(data){
                                //这里要返回所有数据
                                // console.log(data);
                              /*  $scope.addsancur=data;
                                vt.sanji.push($scope.addsancur);*/
                            	$scope.listss=data;
                                $scope.addsancur={};
                                if( $('#'+$scope.addsancur.id).parent().prev().hasClass('active')){
                                    $('#'+$scope.addsancur.id).parent().addClass('active');
                                }else{
                                    $('#'+$scope.addsancur.id).parent().removeClass('active');
                                    //console.log('我们')
                                }

                            })
                         

                        }
                    })
                }
            })
            //console.log($scope.listss);
            // var names=$('.mask-booklist-sanji .input-booklistname').val();
            $('.mask-booklist-sanji .input-booklistname').val('');
            $scope.xianshi3=false;
        }
        //点击以及展开标签
        var aa=true;
        $scope.zhankai=function(id){

            // $('#'+id).find('.erji').css('display','block');

            /* $('#'+id).find('.glyphicon').toggleClass('glyphicon-chevron-down');
             $('#'+id).parent().find('.erji').toggleClass('active');*/
            if(aa){
                $('#'+id).find('.glyphicon').addClass('glyphicon-chevron-down');
                $('#'+id).parent().find('.erji').addClass('active');

                aa=!aa;
            }else{
                $('#'+id).find('.glyphicon').removeClass('glyphicon-chevron-down');
                $('#'+id).parent().find('.erji').removeClass('active');
                aa=!aa;}
        }
        //点击二级标签展开
        $scope.erjizhankai=function(id){
            // $('#'+id).find('.erji').css('display','block');
            $('#'+id).find('.glyphicon').toggleClass('glyphicon-chevron-down');
            $('#'+id).parent().find('.sanji').toggleClass('active');
        }


     // 点击一级的修改

             $scope.fenleigai=function(id){
                 $scope.xianshi=true;
                 $('.mask-booklist .input-booklistname').val('');
                 angular.forEach($scope.listss,function(v,i){
                     if(v.id==id){
                         $('.mask-booklist .input-booklistname').val(v.name);
                         $scope.curcon={
                             id:id,
                             parentid:v.parentid,
                             name:v.name,
                             erji:v.erji
                         }
                         //console.log($scope.curcon)
                         //console.log(v.name);
                     }
                 })
                 // console.log($('.mask-booklist .juzhong .input-booklistname').val());
             }
//         点击一级修改之后的完成
             $scope.done=function(id){
                 var namel=$('.mask-booklist .juzhong .input-booklistname').val();
                 // console.log(namel);

                 angular.forEach($scope.listss,function(v,i){
                     if(v.id==id){
                         booklistchange.getChange(id,namel).then(function(data) {
                             //这里要返回的是修改的一条数据
                            // console.log(data);
                             /*$scope.curson = data;
                             v=data;
                             $scope.listss[i]=v;
                             console.log($scope.listss)*/
                             $scope.listss=data;

                         })
                     }
                 })
                 $('.mask-booklist .input-booklistname').val('');
                 $scope.curcon={};
                 $scope.xianshi=false;
             }
//         点击二级修改的
             $scope.erjichange=function(pid,id){
                 //console.log(pid*1,id*1);
                 $scope.xianshi22=true;
                 $('.mask-erjichange .input-booklistname').val('');
                 angular.forEach($scope.listss,function(v,i){
                     if(v.id*1==pid*1){
                         // console.log(v);
                         angular.forEach(v.erji,function(v2,i2){
                             if(v2.id*1==id*1){
                                 $('.mask-erjichange .input-booklistname').val(v2.name);
                                 $scope.curcon22={
                                     id:id*1,
                                     parentid:pid*1,
                                     name:v2.name,
                                     sanji:v2.sanji
                                 }
                             }
                         })
                         // console.log($scope.curcon22)
                     }
                 })
             }
//         点击二级修改完成
             $scope.erjichangedone=function(id){
                 var namel=$('.mask-erjichange .juzhong .input-booklistname').val();
                 // console.log(namel);
                 // $scope.curcon22.name=namel

                 angular.forEach($scope.listss,function(v,i){
                     if(v.id*1==$scope.curcon22.parentid*1){
                         angular.forEach(v.erji,function(v2,i2){
                             if(v2.id*1==id*1){
                                 booklistchange.getChange(id,namel,$scope.curcon22.parentid).then(function(data) {
                                     //这里要返回的是修改的一条数据
                                     //console.log(data);
//                                     $scope.curson22 = data;
                                    $scope.listss=data;
//                                     v.erji[i2]=data;
//                                     console.log(v.erji[i2]);
//                                     console.log(v.erji)
                                    

                                 })

                             }
                         })
                     }
                 })
                 $scope.curcon22={};
                 $('.mask-erjichange .juzhong .input-booklistname').val('');

                 $scope.xianshi22=false;
             }
//         点击三级修改
             $scope.sanjichange=function(gid,pid,id){
                 $scope.xianshi33=true;
                 $('.mask-sanjichange .juzhong .input-booklistname').val('');
                 angular.forEach($scope.listss,function(v,i){
                     if(v.id*1==gid*1){
                         angular.forEach(v.erji,function (v2,i2) {
                             if(v2.id*1==pid*1){
                                 angular.forEach(v2.sanji,function(v3,i3){
                                     if(v3.id*1==id*1){
                                         $('.mask-sanjichange .juzhong .input-booklistname').val(v3.name);
                                         $scope.curcon33={
                                             id:id*1,
                                             parentid:pid*1,
                                             grandid:gid*1,
                                             name:v3.name
                                         }
                                     }

                                 })
                             }
                         })
                     }
                 })
             }
//         点击三级修改完成
             $scope.sanjichangedone=function(id){
                 var namel=$('.mask-sanjichange .juzhong .input-booklistname').val();
                 // console.log(namel);
                 // $scope.curcon33.name=namel;

                 angular.forEach($scope.listss,function(v,i){
                     if(v.id*1==$scope.curcon33.grandid*1){
                         // console.log(v);
                         angular.forEach(v.erji,function(v2,i2){
                             if(v2.id*1==$scope.curcon33.parentid*1){
                                 //console.log(v2);
                                 angular.forEach(v2.sanji,function(v3,i3){

                                     if(v3.id*1==$scope.curcon33.id){
                                         booklistchange.getChange($scope.curcon33.id,namel).then(function(data) {
//                                             $scope.curson33 = data;
//                                             v2.sanji[i3]=$scope.curcon33;
                                        	 //console.log(id);
                                        	 $scope.listss=data;
                                         })

                                     }
                                 })
                             }
                         })
                     }
                 })


                 $('.mask-sanjichange .juzhong .input-booklistname').val('');
                 $scope.curcon33={};
                 $scope.xianshi33=false;
             }
    });
//    点击一级页面取消按钮
    $scope.quxiao1=function(){
    	$scope.xianshi=!$scope.xianshi;
    }
//  点击二级页面取消按钮
    $scope.quxiao2=function(){
    	$scope.xianshi22=!$scope.xianshi22;
    }
//  点击三级页面取消按钮
    $scope.quxiao3=function(){
    	$scope.xianshi33=!$scope.xianshi33;
    }
//  点击添加分类取消按钮
    $scope.quxiao4=function(){
    	$scope.xianshi1=!$scope.xianshi1;
    }
//  点击添加分类取消按钮
    $scope.quxiao5=function(){
    	$scope.xianshi2=!$scope.xianshi2;
    }
//  点击添加分类取消按钮
    $scope.quxiao6=function(){
    	$scope.xianshi3=!$scope.xianshi3;
    }
}]);