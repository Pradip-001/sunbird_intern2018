"use strict";
angular.module("playerApp").controller("pageSectionCtrl", ["pageSectionService", "$scope", "$state", "config", "sessionService", "$rootScope", "toasterService", "telemetryService", function(e, r, s, t, o, a, n, i) {
    function c(e, r, s, t) {
     var o = {}; return o.showError = !0, o.isClose = e, o.message = r, o.messageType = s, t && (o.messageText = t), o 
    }
     var g = this;
    g.pageTypeUrls = { resource: "Resource", course: "Course" }, g.playContent = function(e) { a.contentType = e.contentType, a.search.searchKeyword = ""; var t = { content: e, contentName: e.name, contentId: e.identifier };
        s.go("Player", t), i.interactTelemetryData(r.type, e.identifier, e.contentType, a.version, r.type, r.type + "-read") }, g.openCourseView = function(e) {  a.search.searchKeyword = ""; var t = e.courseId || e.identifier,
            n = a.enrolledCourseIds[t] >= 0 ? "ENROLLED_COURSE" : "OTHER_COURSE",
            c = "no";
        c = a.enrolledCourseIds[t] ? "no" : "yes"; var g = { courseType: n, courseId: e.courseId || e.identifier, lectureView: c, progress: e.progress, total: e.total, courseRecordId: e.id, courseName: e.courseName || e.name };
        o.setSessionData("COURSE_PARAMS", g), s.go("Toc", g), i.interactTelemetryData(r.type, t, n, a.version, r.type, r.type + "-read") }, g.sections = function() { g.error = {}, g.loader = n.loader("", a.messages.stmsg.m0053), void 0 === a.search && (a.search = {}), a.search && a.search.sortBy && delete a.search.sortBy.null; var s = { request: { source: "web", name: g.pageTypeUrls[r.type], filters: a.search.filters || {}, sort_by: a.search.sortBy || {} } };
        e.getPageData(t.URL.PAGE_PREFIX, s).then(function(e) { r.type; if (i.setConfigData("env", "course"), i.setConfigData("message", "Content read"), "resource" === r.type && ("library", "/resources", "library", i.setConfigData("env", "library")), e && "OK" === e.responseCode) { var s = e.result.response.sections;
                a.version = e.ver, g.page = []; var t = {}; for (var o in s) { var n = s[o];
                    n.contents && n.contents.length > 0 && (t[n.group] = t[n.group] || {}, t[n.group][n.index] = n) } Object.keys(t).forEach(function(e) { for (var r = 1; r <= Object.keys(t[e]).length; r += 1) 1 === r ? g.page[e - 1] = t[e][r] : Array.prototype.push.apply(g.page[e - 1].contents, t[e][r].contents, g.page[e - 1].id) }), g.loader.showLoader = !1, 0 === g.page.length && (g.error = c(!0, a.messages.stmsg.m0006, a.messages.stmsg.m0008, a.messages.stmsg.m0007)) } else g.loader.showLoader = !1, g.error = c(!0, a.messages.fmsg.m0004, a.messages.emsg.m0002) }).catch(function() { g.loader.showLoader = !1, g.error = c(!0, a.messages.fmsg.m0004, a.messages.emsg.m0002) }) }, g.sections(); var u = a.$on("initPageSearch", function(e, r) { g.sections() }),
        l = a.$on("initPageSearchFromDynamicPage", function(e, r) { a.search.filters = r.FilterData, a.search.sortBy = r.sortByData, g.sections() });
    r.$on("$destroy", function() { u(), l() }); var p = [];
    a.lineInView = function(e, r, s, t, o) { var n = _.filter(p, function(e) { return e.objid === s.identifier }),
            c = angular.element("#" + o + "_" + s.identifier).attr("aria-hidden");!0 === r && 0 === n.length && "false" === c && p.push({ objid: s.identifier, objtype: s.contentType || "course", section: t, index: e }), void 0 !== a.visitData && "Course" === s.contentType && (p = _.union(p, a.visitData)), i.setVisitData(p) } }]);