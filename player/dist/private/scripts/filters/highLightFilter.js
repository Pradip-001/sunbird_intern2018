angular.module("playerApp").filter("highlight",["$sce",function(e){return function(t,l){return l&&(t=t.replace(new RegExp("("+l+")","gi"),'<span id="highlighted" style = "color:#009fda">$1</span>')),e.trustAsHtml(t)}}]);