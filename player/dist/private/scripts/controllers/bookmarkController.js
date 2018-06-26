'use strict'

angular.module('playerApp').controller('bookmarkController', function ($scope) {
	$scope.bookmarkBtnClick = function(bookmarkID) {
  				console.log("bookmark start");
				//toggleButton(event.target);
				var x = document.getElementById(bookmarkID);
                          console.log(x.innerHTML);
                          if (x.innerHTML === "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:white\"></span> Bookmark this content") {
                                console.log("Hey");
                            x.innerHTML = "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:blue\"></span> Bookmarked";
                          } else {
                                console.log("End");
                            x.innerHTML = "<span class=\"glyphicon glyphicon-bookmark\" style=\"color:white\"></span> Bookmark this content";
                          }

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
