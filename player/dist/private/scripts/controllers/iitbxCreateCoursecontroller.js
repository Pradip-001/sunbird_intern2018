
angular.module('playerApp').directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);






angular.module('playerApp').controller('iitbxCreateCourseCtrl', function($scope,$http,$location,$route,$routeParams) {
  
	


$scope.submitCourse = function(){


				var file = $scope.myFile;
               
               // console.log('file is ' );
               // console.dir(file);

            var filepdf = $scope.myFilepdf;


            var coursedataform = new FormData();
               coursedataform.append('coursetitle', $scope.coursetitle);
               coursedataform.append('coursedescription', $scope.description);
               coursedataform.append('thumbnail', file);
               coursedataform.append('filepdf',filepdf);


            var coursedata = {
               'coursetitle':$scope.coursetitle,
               'coursedescription':$scope.description,
               'thumbnail':file,
               'filepdf':filepdf
            }




			      

         //       console.log(coursedata);

               console.log(coursedataform.get('filepdf'));
               

            
            $http({
                        method: 'POST',
                        url: 'http://10.129.103.85:5000/v1/course/iitbx',
                        headers: {'Content-Type': undefined},
                        data: coursedataform
                 }).then(function success(response) {

                        // $scope.coursedetails = response.data;
                        console.log(response.data);
                        

                 }, function error(response) {
                         alert("Error ! Error ! Error !");
                         console.log(response.data);
                });
               // $https:.post(, fd, {
               //    transformRequest: angular.identity,
               //    headers: {'Content-Type': undefined}
               // })
            
               // .success(function(){
               // })
            
               // .error(function(){
               // });


			
	// alert($scope.coursetitle +" "+$scope.description);


}

});
