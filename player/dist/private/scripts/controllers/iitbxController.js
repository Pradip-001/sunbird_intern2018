angular.module('playerApp').controller('iitbxCtrl', function($scope,$http) {
    $scope.resdata = "Utkarsh";
    

    // $http.get('/').then(function(response) {

    //     $scope.resdata = response.data;
    //     console.log(response.data);
    // });

    $http({
  method: 'GET',
  url: 'http://10.129.103.85:5000/v1/course/iitbx'
	}).then(function successCallback(response) {

	$scope.resdata = response.data;
    console.log(response.data);

  }, function errorCallback(response) {
  	alert("working");
   console.log(response.data);
  });


});