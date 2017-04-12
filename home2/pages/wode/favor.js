route.controller("FACtrl",["$scope","$http",function($scope,$http) {
    
    $('#favor  .cjx-pianhaoliebiao ').on('click','span',function(){
        if($(this).hasClass('addactive')){
            $(this).removeClass('addactive');
            var a=$(this).text();
        	angular.forEach($scope.arr,function(v,i){
        		if(a==v){
        			$scope.arr.splice(i,1);
        		}
        	})
            
        }else{
            $(this).addClass('addactive');

            if($(this).hasClass('addactive')){
            	
             $scope.arr.push($(this).text())
              
               
            }
        }
    })

    //
   var favor=$http({
        url:hosturl+"app/applike",
        method:"GET"
    }).success(function(data){
         console.log(data);
    }).error(function(data){
        console.log('处理失败');
    })
    favor.then(function (data) {
        /!*$scope.ribang=data;*!/
        $scope.favor=data.data;
  
    })
    

}
])