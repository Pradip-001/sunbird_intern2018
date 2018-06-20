"use strict";angular.module("playerApp").service("orgConsumptionDataSource",["$rootScope","$q","httpAdapter","toasterService","dataSourceUtils",function(e,t,a,r,s){var o=this;this.getData=function(n){var c,u,i,p;return c=s.constructApiUrl(n,"ORG_CONSUMPTION"),u=t.defer(),i=s.getDefaultHeader(),p=a.httpCall(c,"","GET",i),p.then(function(t){t&&"OK"===t.responseCode?u.resolve(o.parseResponse(t.result)):(r.error(e.messages.fmsg.m0075),u.reject(t))},function(t){r.error(e.messages.emsg.m0005),u.reject(t)}),u.promise},o.parseResponse=function(e){return{bucketData:e.series,numericData:o.extractSnapshotData(e.snapshot),series:""}},o.extractSnapshotData=function(e){return o.blockData=[],angular.forEach(e,function(e,t){switch(t){case"org.consumption.content.time_spent.sum":case"org.consumption.content.time_spent.average":o.blockData.push(s.secondsToMin(e));break;default:o.blockData.push(e)}}),o.blockData}}]);