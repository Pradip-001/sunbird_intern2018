"use strict";angular.module("playerApp").controller("resourceCtrl",["$state","sessionService",function(e,o){var t=this;t.contentPlayer={isContentPlayerEnabled:!1},t.playContent=function(o){var t={content:o,contentName:o.name,contentId:o.identifier};e.go("Player",t)},t.openCourseView=function(t,r){var n={courseType:r,courseId:t.courseId||t.identifier,lectureView:"no",progress:t.progress,total:t.total,courseRecordId:t.id,courseName:t.courseName};o.setSessionData("COURSE_PARAMS",n),e.go("Toc",n)}}]);