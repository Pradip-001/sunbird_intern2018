"use strict";angular.module("playerApp").directive("contentFlag",function(){return{templateUrl:"views/common/contentFlagModal.html",restrict:"E",scope:{type:"=",contentid:"=",contentname:"=",versionkey:"=",redirect:"="},link:function(t,e,n){},controller:"contentFlagController as contentFlag"}});