"use strict";angular.module("playerApp").controller("BatchListController",["$rootScope","toasterService","batchService","$state","userService","PaginationService","permissionsService","telemetryService",function(e,t,s,r,a,i,n,o){function c(e,t,s,r){var a={};return a.showError=!0,a.isClose=e,a.message=t,a.messageType=s,r&&(a.messageText=r),a}var u=this;u.userId=e.userId,u.list=[],u.status=1,u.statusOptions=[{name:"Ongoing Batches",value:1},{name:"Upcoming Batches",value:0},{name:"Previous Batches",value:2}],$("#batchStatusOptions").dropdown(),u.pageLimit=9,u.pager={},u.listBatches=function(r){r=r||1;var a={request:{filters:{status:u.status.toString(),createdFor:n.getRoleOrgMap()&&n.getRoleOrgMap().COURSE_MENTOR,createdBy:u.userId},sort_by:{createdDate:"desc"},offset:(r-1)*u.pageLimit,limit:u.pageLimit}};s.getAllBatchs(a).then(function(a){if(a&&"OK"===a.responseCode){u.userList=[],u.userNames=[],u.participants=[],_.forEach(a.result.response.content,function(e){u.userList.push(e.createdBy),u.participants[e.id]=_.isUndefined(e.participant)?0:_.size(e.participant)}),u.userList=_.compact(_.uniq(u.userList));var n={request:{filters:{identifier:u.userList}}};s.getUserList(n).then(function(s){s&&"OK"===s.responseCode?_.forEach(s.result.response.content,function(e){u.userNames[e.identifier]=e.firstName+" "+e.lastName}):t.error(e.messages.fmsg.m0056)}).catch(function(){t.error(e.messages.fmsg.m0056)}),u.batchList=a.result.response.content||[],u.totalCount=a.result.response.count,u.pager=i.GetPager(a.result.response.count,r,u.pageLimit),0===u.batchList.length?u.error=c(!0,e.messages.stmsg.m0020,e.messages.stmsg.m0008):u.error={}}else t.error(e.messages.fmsg.m0004)}).catch(function(){t.error(e.messages.fmsg.m0004)})},u.listBatches(),u.showUpdateBatchModal=function(e){s.setBatchData(e),r.go("updateBatch",{batchId:e.identifier})},u.setPage=function(e){e<1||e>u.pager.totalPages||u.listBatches(e)},u.generateInteractEvent=function(e,t){o.interactTelemetryData("workspace",t,e,"1.0",e,"workspace-course-batches")};var g=[];u.lineInView=function(e,t,s,r){var a=_.filter(g,function(e){return e.objid===s.identifier});!0===t&&0===a.length&&g.push({objid:s.identifier,objtype:"batch",section:r,index:e}),console.log("------",g),o.setVisitData(g)}}]);