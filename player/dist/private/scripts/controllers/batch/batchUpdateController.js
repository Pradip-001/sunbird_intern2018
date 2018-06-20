"use strict";angular.module("playerApp").controller("BatchUpdateController",["$rootScope","$timeout","$state","$scope","$stateParams","config","batchService","$filter","toasterService","userService","permissionsService",function(e,t,a,r,s,n,i,o,c,d,u){var l=this;l.userList=[],l.menterList=[],l.userId=e.userId,l.submitted=!1,l.batchId=s.batchId,l.coursecreatedby=s.coursecreatedby,l.searchUserMap={},l.userSearchTime=0,l.selectedUsers=[],l.selectedMentors=[],l.init=function(){l.getBatchDetails(),l.getUserList()},l.getSelectedUser=function(e){var t=[];for(var a in e)e[a]&&t.push(a);return t},l.getBatchDetails=function(){if(l.batchData=i.getBatchData(),_.isEmpty(l.batchData))i.getBatchDetails({batchId:l.batchId}).then(function(t){if(t&&"OK"===t.responseCode){l.batchData=t.result.response;var a=l.getSelectedUser(l.batchData.participant),r=_.concat(a,l.batchData.mentors);l.getUserList(void 0,r)}else c.error(e.messages.fmsg.m0054)}).catch(function(){c.error(e.messages.fmsg.m0054)});else{var t=l.getSelectedUser(l.batchData.participant),a=_.concat(t,l.batchData.mentors);l.getUserList(void 0,a)}},l.showUpdateBatchModal=function(e,t){l.coursecreatedby=l.coursecreatedby||l.batchData.courseCreator,_.forEach(l.batchData.participant,function(e,t){_.isUndefined(_.find(l.userList,["id",t]))||(l.selectedUsers.push(_.find(l.userList,["id",t])),l.userList=_.reject(l.userList,["id",t]),l.selectedUsers=_.uniqBy(l.selectedUsers,"id"))}),_.forEach(l.batchData.mentors,function(e,t){_.isUndefined(_.find(l.menterList,["id",e]))||(l.selectedMentors.push(_.find(l.menterList,["id",e])),l.menterList=_.reject(l.menterList,["id",e]),l.selectedMentors=_.uniqBy(l.selectedMentors,"id"))}),l.isUserSearch=0,$("#users").dropdown("refresh"),$("#mentors").dropdown("refresh"),Object.keys(l.searchUserMap).length<=2&&l.initializeUI()},l.initializeUI=function(){t(function(){l.initializeEvent(),"open"===l.batchData.enrollmentType?$('input:radio[name="enrollmentType"]').filter('[value="open"]').attr("checked",!0):$('input:radio[name="enrollmentType"]').filter('[value="invite-only"]').attr("checked",!0),$(".ui.calendar").calendar({refresh:!0});var e=new Date,t=new Date(l.batchData.startDate),r=new Date(e.setDate(e.getDate()+1));r<t&&(t=r),$("#updateBatchModal").modal({closable:!1,onShow:function(){$(".ui.calendar#rangestartAdd").calendar({type:"date",minDate:new Date(t.getFullYear(),t.getMonth(),t.getDate()),formatter:{date:function(e,t){return o("date")(e,"yyyy-MM-dd")}},onChange:function(e,a,r){l.batchData.startDate=a,$(".ui.calendar#rangeendAdd").calendar({type:"date",minDate:new Date(t.getFullYear(),t.getMonth(),parseInt(t.getDate())+1),formatter:{date:function(e,t){return o("date")(e,"yyyy-MM-dd")}},onChange:function(e,t,a){l.batchData.endDate=t}})}}),$(".ui.calendar#rangeendAdd").calendar({type:"date",minDate:new Date(t.getFullYear(),t.getMonth(),parseInt(t.getDate())+1),formatter:{date:function(e,t){return o("date")(e,"yyyy-MM-dd")}},startCalendar:$(".ui.calendar#rangestartAdd"),onChange:function(e,t,a){l.batchData.endDate=t}}),$(".ui.calendar #startDate").val(l.batchData.startDate),$(".ui.calendar #endDate").val(l.batchData.endDate),$(".ui.modal.transition.hidden").remove()},onHide:function(){var e=JSON.parse(window.localStorage.getItem("previousURl"));s.name!==e.name?a.go(e.name,e.params):a.go("Toc",{courseId:l.batchData.courseId,lectureView:"yes"})}}).modal("show")},10)},l.clearForm=function(){$("#updateBatch").form("clear"),$("#updateBatch").find(".search").val("")},l.initializeEvent=function(){$("#users,#mentors").dropdown({forceSelection:!1,fullTextSearch:!0}),$("#users input.search").on("keyup",function(e){l.isUserSearch=1,l.getUserListWithQuery(this.value)}),$("#mentors input.search").on("keyup",function(e){l.isUserSearch=2,l.getUserListWithQuery(this.value)})},l.getUserListWithQuery=function(e){l.userSearchTime&&clearTimeout(l.userSearchTime),l.userSearchTime=setTimeout(function(){var t=l.searchUserMap[e];t?(l.isUserSearch=0,l.userList=t.user,l.menterList=t.mentor,$("#users").dropdown("refresh"),$("#mentors").dropdown("refresh")):l.getUserList(e)},1e3)},l.getUserList=function(t,a){var r=i.getRequestBodyForUserSearch(t,a);i.getUserList(r).then(function(r){r&&"OK"===r.responseCode?(_.forEach(r.result.response.content,function(a){if(a.identifier!==e.userId&&i.filterUserSearchResult(a,t)){var r={id:a.identifier,name:a.firstName+(a.lastName?" "+a.lastName:""),avatar:a.avatar,otherDetail:i.getUserOtherDetail(a)};_.forEach(a.organisations,function(e){-1!==_.indexOf(e.roles,"COURSE_MENTOR")&&l.menterList.push(r)}),l.userList.push(r)}}),l.userList=_.uniqBy(l.userList,"id"),l.menterList=_.uniqBy(l.menterList,"id"),a||(l.searchUserMap[t||""]={mentor:_.clone(l.menterList),user:_.clone(l.userList)}),l.isUserSearch=0,l.showUpdateBatchModal()):(l.isUserSearch=0,c.error(e.messages.fmsg.m0056))}).catch(function(){l.isUserSearch=0,c.error(e.messages.fmsg.m0056)})},l.hideUpdateBatchModal=function(){$("#updateBatchModal").modal("hide"),$("#updateBatchModal").modal("hide others"),$("#updateBatchModal").modal("hide dimmer")},l.updateBatchDetails=function(t){if(r.updateBatch.$valid){var a={request:{name:t.name,description:t.description,enrollmentType:t.enrollmentType,startDate:t.startDate,endDate:t.endDate,createdFor:t.createdFor,id:t.id}};if("open"!==t.enrollmentType){t.mentors=$("#mentorSelList").val().split(",");var s=[];_.forEach(l.selectedMentors,function(e){s.push(e.id)}),a.request.mentors=_.concat(_.compact(t.mentors),s)}i.update(a).then(function(a){if(a&&"OK"===a.responseCode)if("open"!==t.enrollmentType)if(t.users=_.compact($("#userSelList").val().split(",")),t.users&&t.users.length>0){var r={request:{userIds:t.users}};i.addUsers(r,t.id).then(function(t){t&&"OK"===t.responseCode?l.hideUpdateBatchModal():c.error(e.messages.fmsg.m0053)}).catch(function(){c.error(e.messages.fmsg.m0053)})}else l.hideUpdateBatchModal();else l.hideUpdateBatchModal();else c.error(e.messages.fmsg.m0055)}).catch(function(t){c.error(e.messages.fmsg.m0055)})}}}]);