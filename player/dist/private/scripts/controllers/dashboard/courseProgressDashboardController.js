"use strict";angular.module("playerApp").controller("courseProgressDashboardCtrl",["$rootScope","$scope","QueryService","$timeout","$state","$stateParams","toasterService","batchService",function(e,o,t,r,s,a,i,n){function d(e){c.showLoader=e}var c=this;c.showError=!1,d(!0);var l=new t.CreateNewInstance({eid:"downloadReport"}),u={"7d":e.messages.imsg.m0022,"14d":e.messages.imsg.m0023,"5w":e.messages.imsg.m0024,fromBegining:e.messages.imsg.m0025};c.getCourseDashboardData=function(e){d(!0),c.timePeriod=e||"7d",c.dashboarData=[],new t.CreateNewInstance({eid:"courseProgress"}).getData({identifier:c.batchIdentifier,timePeriod:c.timePeriod}).then(function(e){c.showError=!1,c.filterText=u[c.timePeriod],c.dashboarData=e,d(!1)}).catch(function(e){c.showErrors()})},c.onAfterFilterChange=function(e){if(c.timePeriod===e)return console.log("avoid same apis call twice"),!1;c.orderByField="",c.getCourseDashboardData(e)},c.loadData=function(){var o={request:{filters:{courseId:a.courseId,status:["1","2","3"],createdBy:e.userId},sort_by:{createdDate:"desc"}}};c.myBatches=[],c.searchUser="",n.getAllBatchs(o).then(function(e){e&&"OK"===e.responseCode?e.result.response.content.length>0&&(c.myBatches=e.result.response.content,c.buildMyBatchesDropdown()):c.showErrors(),d(!1)}).catch(function(e){c.showErrors()})},c.buildMyBatchesDropdown=function(){if(1===c.myBatches.length){var e=_.first(_.values(c.myBatches),1);c.batchIdentifier=e.id,c.courseName=e.name,c.getCourseDashboardData("7d")}else d(!1),c.isMultipleCourses=c.myBatches.length>1},c.resetDropdown=function(){$("#courseDropdownValues").dropdown("restore defaults")},c.showErrors=function(){c.showError=!0,d(!1)},c.initDropdwon=function(){$("#myBatchesListFilter").dropdown({})},c.onAfterBatchChange=function(e){if(c.batchIdentifier===e)return console.log("avoid same apis call twice"),!1;c.batchIdentifier=e,c.isMultipleCourses=!1,c.getCourseDashboardData(c.timePeriod)},c.downloadReport=function(){c.disabledClass=!0,l.download({identifier:c.batchIdentifier,timePeriod:c.timePeriod},"COURSE_PROGRESS").then(function(o){c.downloadReportText=e.messages.stmsg.m0095,$("#downloadReportModal").modal({closable:!0,observeChanges:!0}).modal("show"),c.disabledClass=!1}).catch(function(e){c.disabledClass=!1,i.error(e.params.errmsg)})}}]);