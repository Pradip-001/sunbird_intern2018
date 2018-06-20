"use strict";angular.module("playerApp").controller("AppCtrl",["$scope","permissionsService","$rootScope","userService","$q","config","$location","$timeout","telemetryService","messages","frmelmnts","sessionService","learnService","$http","searchService","toasterService","adminService","$state","$window",function(e,o,t,r,n,s,a,i,l,c,u,d,g,f,p,m,v,h,O){t.userId=$("#userId").attr("value"),t.sessionId=$("#sessionId").attr("value"),t.logSession=$("#logSession").attr("value"),t.cdnUrl=$("#cdnUrl").attr("value")||"",t.language=$("#defaultPortalLanguage").attr("value")||"en",t.content_channel_filter_type=$("#contentChannelFilterType").attr("value"),t.messages=c[t.language],t.frmelmnts=u[t.language],t.searchKey="",t.enrolledCourseIds={},l.setConfigData("env","home"),l.setConfigData("message","Content read"),org.sunbird.portal.appid=$("#producerId").attr("value"),t.contentModelSetBackLink=function(){t.contentModelBackLinkName=h.current.name},window.localStorage.redirectUrl&&(a.path(window.localStorage.redirectUrl),delete window.localStorage.redirectUrl),t.openLink=function(e){a.path(e)},e.$watch("$root.language",function(e,o){o!==e&&(window.localStorage.language=t.language,O.location.reload())}),t.mergeObjects=function(e,o){var t="";return Object.keys(e).length>0?(t=JSON.stringify(e)+JSON.stringify(o),t=t.replace(/\}\{/,","),t=JSON.parse(t)):t=o,t},$("body").click(function(e){if("search-suggestions"===$(e.target).closest("div.dropdown-menu-list").prop("id"))return!1;$("body").find(".dropdown-menu-list").removeClass("visible").addClass("hidden")}),e.logout=function(){window.document.location.replace("/logout")},e.userProfile=function(r){t.avatar=r.avatar,t.firstName=r.firstName,t.lastName=r.lastName;var n=[];t.organisations=r.organisations,t.profileCompleteness=r.completeness,t.profileMissingFields=r.missingFields||[];var s=[],a={};org.sunbird.portal.channel=_.get(r,"rootOrg.hashTagId"),t.rootOrgId=r.rootOrgId,t.rootOrgAdmin=!1;var i=[];_.forEach(r.organisations,function(e){e.roles&&_.isArray(e.roles)&&(n=_.union(n,e.roles),e.organisationId===r.rootOrgId&&(_.indexOf(e.roles,"ORG_ADMIN")>-1||_.indexOf(e.roles,"SYSTEM_ADMINISTRATION")>-1)&&(t.rootOrgAdmin=!0),a[e.organisationId]=e.roles),e.organisationId&&i.push(e.organisationId),e.orgName&&s.push(e.orgName)}),t.rootOrgId&&i.push(t.rootOrgId),_.get(r,"rootOrg.orgName")&&s.push(r.rootOrg.orgName),o.setRoleOrgMap(r),i=_.uniq(i),t.organisationNames=_.uniq(s),t.organisationIds=angular.copy(i),org.sunbird.portal.dims=_.concat(i,org.sunbird.portal.channel),o.setCurrentUserRoleMap(a),o.setCurrentUserRoles(n),t.initializePermissionDirective=!0,l.init(),e.logSessionStartEvent(),e.setRootOrgInfo(r)},e.logSessionStartEvent=function(){"false"===t.logSession&&f.get("/v1/user/session/start/"+EkTelemetry.fingerPrintId,{headers:{"X-Channel-Id":org.sunbird.portal.channel}}).then(function(e){}).catch(function(){})},e.getTelemetryConfigData=function(){org.sunbird.portal.sid=t.sessionId,org.sunbird.portal.uid=t.userId,f.get("/get/envData").then(function(o){org.sunbird.portal.appid=o.data.appId,org.sunbird.portal.ekstep_env=o.data.ekstep_env,org.sunbird.portal.init(),l.init(),e.logSessionStartEvent()}).catch(function(){})},e.getTelemetryConfigData(),e.setRootOrgInfo=function(e){e.rootOrg&&(document.title=_.isUndefined(e.rootOrg.orgName)?"Sunbird":e.rootOrg.orgName,f.get("/v1/tenant/info/"+e.rootOrg.slug,{headers:{"X-Channel-Id":org.sunbird.portal.channel}}).then(function(e){if(e&&"OK"===e.statusText){t.orgLogo=e.data.result.logo;var o=document.createElement("link"),r=document.getElementById("dynamic-favicon");o.id="dynamic-favicon",o.rel="icon",o.href=e.data.result.favicon,r&&document.head.removeChild(r),document.head.appendChild(o)}}).catch(function(e){console.log("app controller",e),m.error(t.messages.fmsg.m0057)}))},e.getProfile=function(o){var n=r.getCurrentUserProfile();_.isEmpty(n)?r.getUserProfile(t.userId,o).then(function(o){if(o&&"OK"===o.responseCode){var t=o.result.response;r.setCurrentUserProfile(t),e.userProfile(t)}}).catch(function(e){console.log("err",e)}):e.userProfile(n)},e.getProfile("completeness,missingFields"),t.closeRoleAccessError=function(){t.accessDenied=""},e.getMyCourses=function(){d.setSessionData("ENROLLED_COURSES",void 0),g.enrolledCourses(t.userId).then(function(e){e&&"OK"===e.responseCode?(t.enrolledCourses=e.result.courses,t.enrolledCourseIds=t.arrObjsToObject(t.enrolledCourses,"courseId"),d.setSessionData("ENROLLED_COURSES",{uid:t.userId,courseArr:t.enrolledCourses,courseObj:t.enrolledCourseIds})):(t.enrolledCourses=void 0,d.setSessionData("ENROLLED_COURSES",void 0))})},t.arrObjsToObject=function(e,o){var t={};return e.forEach(function(e){t[e[o]]=e}),t},t.enrolledCourses||e.getMyCourses(),t.loadProgress=function(){$(".course-progress").progress("reset"),i(function(){$(".course-progress").progress()},100)},t.getConcept=function(o,r,n){var s={filters:{objectType:["Concept"]},offset:o,limit:r};p.search(s).then(function(s){s.result&&s.result&&_.isArray(s.result.concepts)&&(_.forEach(s.result.concepts,function(o){e.concepts.push(o)}),s.result.count>o&&s.result.count>o+r?(o+=r,r=s.result.count-r,t.getConcept(o,r,n)):n(null,e.concepts))}).catch(function(e){n(e,null)})},t.concepts||(e.concepts=[],t.getConcept(0,200,function(e,o){e?m.error(t.messages.fmsg.m0015):t.concepts=o})),e.getOrgTypes=function(){p.getOrgTypes().then(function(e){"OK"===e.responseCode&&p.setOrgTypes(e.result.response)})},e.openProfileView=function(){h.go("Profile")},t.generateInteractEvent=function(e,o,t,r,n,s,a){l.interactTelemetryData(e,o,t,r,n,s,a)},t.generateStartEvent=function(e,o,t,r,n,s,a){l.startTelemetryData(e,o,t,r,n,s,a)},t.generateEndEvent=function(e,o,t,r,n,s,a){l.endTelemetryData(e,o,t,r,n,s,a)},e.getOrgTypes(),O.onbeforeunload=function(){document.dispatchEvent(new CustomEvent("TelemetryEvent",{detail:{name:"window:unload"}}))}}]);