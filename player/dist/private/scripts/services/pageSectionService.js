"use strict";
angular.module("playerApp").service("pageSectionService", ["restfulLearnerService", "searchService", function(e, r) { this.getPageData = function(t, a) { return a.request = r.updateReqForChannelFilter(a.request), e.post(t, a) } }]);