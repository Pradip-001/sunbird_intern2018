"use strict";angular.module("playerApp").service("setupService",["config","restfulLearnerService",function(e,r){this.addOrgType=function(t){var n=e.URL.ORG_TYPE.ADD;return r.post(n,t)},this.updateOrgType=function(t){var n=e.URL.ORG_TYPE.UPDATE;return r.patch(n,t)},this.getOrgTypes=function(){var t=e.URL.ORG_TYPE.GET;return r.get(t)}}]);