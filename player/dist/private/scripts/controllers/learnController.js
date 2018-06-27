"use strict";
angular.module("playerApp").controller("LearnCtrl", ["learnService", "$scope", "$state", "$rootScope", "sessionService", "toasterService", "telemetryService",
 function(e, r, s, o, n, t, a) {
  var i = this,
      l = o.userId;
      r.contentPlayer = { isContentPlayerEnabled: !1 },
      i.openCourseView = function(e, r) {
       	o.search.searchKeyword = ""; var t = "no";
        t = o.enrolledCourseIds[e.courseId || e.identifier] ? "no" : "yes";
        var i = { courseType: r, courseId: e.courseId || e.identifier, lectureView: t, progress: e.progress, total: o.enrolledCourseIds[e.courseId].leafNodesCount, courseName: e.courseName || e.name, lastReadContentId: e.lastReadContentId };
        n.setSessionData("COURSE_PARAMS", i), o.isPlayerOpen = !0, s.go("Toc", i),a.interactTelemetryData("course", e.courseId, "course", o.version, "course-read", "course") }, i.courses = function() { var r = "enrollCourseApi";
        i[r] = {}, i[r].loader = t.loader("", o.messages.stmsg.m0001), e.enrolledCourses(l).then(function(e) { e && "OK" === e.responseCode ? (i[r].loader.showLoader = !1, o.enrolledCourses = e.result.courses, o.enrolledCourseIds = o.arrObjsToObject(o.enrolledCourses, "courseId"), i.enrolledCourses = o.enrolledCourses) : (i[r].loader.showLoader = !1, t.error(o.messages.fmsg.m0001)) }).catch(function() { i[r].loader.showLoader = !1, t.error(o.messages.fmsg.m0001) }) }, o.enrolledCourseIds && !_.isEmpty(o.enrolledCourseIds) ? i.enrolledCourses = o.enrolledCourses : i.courses(); var d = [];
    i.lineInView = function(e, r, s, n, t) {
     var i = _.filter(d, function(e) { return e.objid === s.identifier }),
            l = angular.element("#" + t + "_" + s.identifier).attr("aria-hidden");!0 === r && 0 === i.length && "false" === l && d.push({ objid: s.identifier, objtype: s.contentType || "course", section: n, index: e }), o.$broadcast("mycoursesVisit", d), a.setVisitData(d) }, o.$on("mycoursesVisit", function(e, r) { o.visitData = r }) }]);