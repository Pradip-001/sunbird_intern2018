"use strict";angular.module("playerApp").directive("contentBadge",function(){return{templateUrl:"views/badge/contentBadge.html",restrict:"E",scope:{contentid:"=",data:"="},link:function(t,e,n){},controller:"contentBadgeController as contentBadge"}});