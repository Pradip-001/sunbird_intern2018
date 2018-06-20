"use strict";angular.module("playerApp").controller("ReviewContentController",["contentService","searchService","config","$rootScope","$scope","$state","toasterService","PaginationService","workSpaceUtilsService","telemetryService",function(e,t,r,o,n,s,a,i,c,l){function g(e,t,r,o){var n={};return n.showError=!0,n.isClose=e,n.message=t,n.messageType=r,o&&(n.messageText=o),n}var u=this;u.userId=o.userId,n.contentPlayer={isContentPlayerEnabled:!1},u.status=["Review","FlagReview"],u.sortBy="desc",u.pageLimit=9,u.pager={},u.getReviewContent=function(e){e=e||1,u.loader=a.loader("",o.messages.stmsg.m0018),u.error={};var n={filters:{status:u.status,createdBy:u.userId,objectType:"Content",contentType:r.contributeContentType},sort_by:{lastUpdatedOn:u.sortBy},offset:(e-1)*u.pageLimit,limit:u.pageLimit};t.search(n).then(function(t){t&&"OK"===t.responseCode?(u.loader.showLoader=!1,u.error.showError=!1,u.reviewContentData=t.result.content||[],u.totalCount=t.result.count,u.version=t.ver,u.pager=i.GetPager(t.result.count,e,u.pageLimit),0===u.reviewContentData.length&&(u.error=g(!0,o.messages.stmsg.m0019,o.messages.stmsg.m0008))):(u.loader.showLoader=!1,u.error.showError=!1,a.error(o.messages.fmsg.m0012))}).catch(function(){u.loader.showLoader=!1,u.error.showError=!1,a.error(o.messages.fmsg.m0012)})},u.openContentPlayer=function(e){c.openContentPlayer(e,s.current.name)},u.setPage=function(e){e<1||e>u.pager.totalPages||u.getReviewContent(e)},u.initTocPopup=function(){$(".cardTitleEllipse").popup({inline:!0})},u.generateInteractEvent=function(e,t,r,o){l.interactTelemetryData(o,r,e,u.version,e,t)};var p=[];u.lineInView=function(e,t,r,o){var n=_.filter(p,function(e){return e.objid===r.identifier});!0===t&&0===n.length&&p.push({objid:r.identifier,objtype:r.contentType||"workspace",section:o,index:e}),console.log("------",p),l.setVisitData(p)}}]);