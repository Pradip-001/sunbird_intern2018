"use strict";angular.module("playerApp").controller("playerCtrl",["$stateParams","$log","$scope","$rootScope","$sessionStorage","$timeout","$location","$anchorScroll",function(n,t,e,o,a,c,l,r){var s=this;s.contentPlayer={isContentPlayerEnabled:!1},s.ngInit=function(){n.content?(s.contentPlayer.isContentPlayerEnabled=!0,s.contentPlayer.contentData=n.content,s.hashId="content/"+n.content.identifier):""!==l.hash()?(s.contentPlayer.isContentPlayerEnabled=!0,s.hashId=l.hash(),s.contentPlayer.contentId=s.hashId.replace("content/","")):n.contentId&&(s.contentPlayer.isContentPlayerEnabled=!0,s.contentPlayer.contentId=n.contentId,s.hashId="content/"+n.contentId),s.scrollToPlayer()},s.scrollToPlayer=function(){l.hash(s.hashId),c(function(){r()},500)}}]);