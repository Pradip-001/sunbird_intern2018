'use strict'

angular.module('playerApp').directive('bookmark', function () {
  return {
    templateUrl: 'views/course/bookmark.html',
    restrict: 'E',
    scope: {
      type: '=',
      selectedConcepts: '=',
      isSearchPage: '='
    },
    link: function (scope, element, attrs) {

    },
    controller: 'bookmarkController'
  }
})
