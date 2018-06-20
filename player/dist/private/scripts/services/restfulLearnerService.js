"use strict";angular.module("playerApp").service("restfulLearnerService",["$http","$rootScope","$filter","config","uuid4",function(e,t,n,r,a){function o(){t.userId=t.userId||$("#userId").attr("value");var e={"Content-Type":"application/json",Accept:"application/json","X-Consumer-ID":"X-Consumer-ID","X-Device-ID":"X-Device-ID","X-msgid":a.generate(),ts:n("date")(new Date,"yyyy-MM-dd HH:mm:ss:sssZ"),"X-Source":"web","X-Org-code":"AP"};return org.sunbird.portal.channel&&(e["X-Channel-Id"]=org.sunbird.portal.channel),e.Accept="text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8",e}function i(t,n,a,i){var s=i||o(),u=r.URL.BASE_PREFIX+r.URL.LEARNER_PREFIX+t;return e({method:a,url:u,headers:s,data:n})}function s(e){return e.data}function u(e){return e.data&&440===e.status&&(alert("Session expired, please login again..."),window.document.location.replace("/logout")),e.data}this.post=function(e,t,n){return i(e,t,"POST",n).then(s,u)},this.get=function(e,t,n){return i(e,t,"GET",n).then(s,u)},this.remove=function(e,t,n){return i(e,t,"DELETE",n).then(s,u)},this.patch=function(e,t,n){return i(e,t,"PATCH",n).then(s,u)},this.upload=function(t,o){var i=r.URL.BASE_PREFIX+r.URL.LEARNER_PREFIX+t,c={"Content-Type":void 0,"X-Consumer-ID":"X-Consumer-ID","X-Device-ID":"X-Device-ID","X-msgid":a.generate(),ts:n("date")(new Date,"yyyy-MM-dd HH:mm:ss:sssZ"),"X-Source":"web","X-Org-code":"AP"};return e({method:"POST",url:i,headers:c,data:o}).then(s,u)}}]);