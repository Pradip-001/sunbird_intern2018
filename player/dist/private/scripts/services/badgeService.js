"use strict";angular.module("playerApp").service("badgeService",["restfulLearnerService","config","permissionsService","userService","$rootScope",function(e,r,t,n,s){this.addBadges=function(t){var n=r.URL.BADGE.ASSIGN;return e.post(n,t)},this.getAllBadgesList=function(t){var n=r.URL.BADGE.BADGE_CLASS_SEARCH;return e.post(n,t)},this.getDetailedBadgeAssertions=function(t,n){return new Promise(function(s,i){var o=r.URL.BADGE.BADGE_CLASS_SEARCH;e.post(o,t).then(function(e){var r=n;e&&"OK"===e.responseCode&&e.result&&e.result.badges&&angular.forEach(r,function(r){var t=_.find(e.result.badges,{badgeId:r.badgeId});t&&(r.description=t.description)}),s(r)}).catch(function(e){i(e)})})}}]);