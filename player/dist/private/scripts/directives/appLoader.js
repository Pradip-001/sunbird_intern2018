"use strict";angular.module("playerApp").directive("appLoader",function(){return{templateUrl:"views/common/loaderWithMessage.html",restrict:"E",link:function(a,e,t){t.data=t.data?JSON.parse(t.data):void 0,a.headerMessage=t.data&&t.data.headerMessage?t.data.headerMessage:"Please wait.",a.loaderMessage=t.data&&t.data.loaderMessage?t.data.loaderMessage:"We are fetching details"}}});