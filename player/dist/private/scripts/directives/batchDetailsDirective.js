"use strict";angular.module("playerApp").directive("batchDetails",["$rootScope",function(t){return{restrict:"E",controller:"BatchController",controllerAs:"batch",scope:{batchInfo:"="},link:function(e,c,l,o){t.$on("batchDetails",function(t,e){o.batchInfo=e})},replace:!0,templateUrl:"views/batch/batchDetails.html"}}]);