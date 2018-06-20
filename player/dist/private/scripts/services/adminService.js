"use strict";angular.module("playerApp").service("adminService",["config","restfulLearnerService",function(t,e){this.userSearch=function(r){var s=t.URL.ADMIN.USER_SEARCH;return e.post(s,r)},this.orgSearch=function(r){var s=t.URL.ADMIN.ORG_SEARCH;return e.post(s,r)},this.deleteUser=function(r){var s=t.URL.ADMIN.DELETE_USER;return e.post(s,r)},this.updateRoles=function(r){var s=t.URL.ADMIN.UPDATE_USER_ORG_ROLES;return e.post(s,r)},this.bulkUserUpload=function(r){var s=t.URL.ADMIN.BULK.USERS_UPLOAD;return e.upload(s,r)},this.bulkOrgrUpload=function(r){var s=t.URL.ADMIN.BULK.ORGANIZATIONS_UPLOAD;return e.upload(s,r)},this.bulkUploadStatus=function(r){var s=t.URL.ADMIN.BULK.STATUS+"/"+r;return e.get(s)},this.addBadges=function(r){var s=t.URL.BADGE.ASSIGN;return e.post(s,r)},this.getBadges=function(){var r=t.URL.BADGE.GET;return e.get(r)},this.setBadges=function(t){this.badges=t.result.response},this.getBadgesList=function(){return this.badges?this.badges:this.getBadges().then(function(t){return t.result.response})}}]);