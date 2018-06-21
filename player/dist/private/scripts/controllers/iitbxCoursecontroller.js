angular.module('playerApp').controller('iitbxCourseCtrl', function($scope,$http,$location,$route,$routeParams) {
  
	var url = $location.path().split('/');
    console.log("----------------"+url[2]);
    $scope.container = url[2];
   
 //   $scope.$on('coursedata', function(event, opt) {
 // // access opt.a, opt.b
 // 		$scope.temp = opt[0];
 //   });

$scope.coursedetails = {};

 				$http({
                        method: 'GET',
                        url: 'http://10.129.103.85:5000/v1/course/iitbx/'+$scope.container
                 }).then(function success(response) {

                        $scope.coursedetails = response.data;
                        console.log(response.data);
                        

                 }, function error(response) {
                         alert("Error ! Error ! Error !");
                         console.log(response.data);
                });
});