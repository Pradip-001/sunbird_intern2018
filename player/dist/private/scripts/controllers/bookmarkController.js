'use strict'

angular.module('playerApp').controller('bookmarkController', function ($scope) {
	$scope.bookmarked = false; 
	$scope.bookmarkBtnClick = function() {
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
	function toggleButton(element) {
			 // var pressed = (element.getAttribute("aria-pressed") === "true");
			 // element.setAttribute("aria-pressed", !pressed);
			  var x = document.getElementById("bookmark");
			  console.log(x.innerHTML);
			  if (x.innerHTML === "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:white\"></span> Bookmark this content") {
			  	console.log("Hey");
			    x.innerHTML = "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:blue\"></span> Bookmarked";
			  } else {
			  	console.log("End");
			    x.innerHTML = "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:white\"></span> Bookmark this content";
			  }
		}  
})
