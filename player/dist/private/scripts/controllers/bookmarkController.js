'use strict'

angular.module('playerApp').controller('bookmarkController', function ($scope,$rootScope,$stateParams) {
	$scope.bookmarked = false; 
	$scope.bookmarkBtnClick = function() {
				alert("org Id: "+$rootScope.organisationIds+"userId: "+$rootScope.userId+"course ID: "+ $stateParams.courseId+" contentId: " + $scope.$parent.item.name);
				if($scope.bookmarked==false)
				$scope.bookmarked = true;
				else
					$scope.bookmarked = false;
				
  				console.log("bookmark st");
				//toggleButton(event.target);
				// var x = document.getElementById($scope.$parent.item.name);
    //                       console.log(x.innerHTML);
    //                       if (x.innerHTML === "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:white\"></span> Bookmark this content") {
    //                             console.log("Hey");
    //                         x.innerHTML = "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:blue\"></span> Bookmarked";
    //                       } else {
    //                             console.log("End");
    //                         x.innerHTML = "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:white\"></span> Bookmark this content";
    //                       }

				console.log("bookmark end");
			}  
})
