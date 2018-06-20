"use strict";angular.module("playerApp").service("telemetryService",["$rootScope","config","$window",function(t,e,a){this.context=[],this.configData={message:"api call default message"},this.visitData=[],this.config={},this.getConfigData=function(t){return this.configData[t]?this.getConfigData[t]:this.config[t]},this.config={pdata:{id:org.sunbird.portal.appid||"sunbird.portal",ver:"1.5.1",pid:"sunbird-portal"},env:this.getConfigData("env")||"Home",channel:org.sunbird.portal.channel||"sunbird",did:void 0,authtoken:void 0,uid:t.userId,sid:t.sessionId,batchsize:e.TELEMETRY.MAX_BATCH_SIZE||10,host:"",endpoint:e.TELEMETRY.SYNC,apislug:e.URL.BASE_PREFIX+e.URL.CONTENT_PREFIX,dispatcher:void 0,runningEnv:"client",tags:[]},this.ProfileLockConfig={phone:"phn-number-lock",email:"email-lock",gender:"gender-lock",dob:"birthdate-lock",location:"current-location-lock",grade:"grade-lock",language:"known-language-lock",subject:"subject-experties-lock",webPages:"social-media-link-lock",address:"address-lock",profileSummary:"profile-summary-lock",education:"education-lock",jobProfile:"job-profile-lock",skills:"skills-lock"},this.ProfileSectionConfig={profileSummary:"profile-update-summary",editSummary:"profile-edit-summary",closeSummary:"profile-close-summary",addExperience:"profile-update-experience",editExperience:"profile-edit-experience",closeExperience:"profile-close-experience",experience:"add-experience",deleteExperience:"profile-delete-experience",address:"add-address",editAddress:"profile-edit-address",addAddress:"profile-add-address",deleteAddress:"profile-delete-address",closeAddress:"profile-close-address",addEducation:"profile-update-education",editEducation:"profile-edit-education",education:"add-education",deleteEducation:"profile-delete-education",closeEducation:"profile-close-education",skills:"add-skills",removeSkills:"profile-delete-skills",cancelSkills:"profile-cancel-skills",addSkills:"profile-add-skills",basicInfo:"profile-additional-info",editBasicInfo:"edit-additional-info",closeBasicInfo:"close-additional-info",phone:"add-phone-number",gender:"add-gender",dob:"add-dateof-birth",grade:"add-grade",language:"add-known-language",subject:"add-subject-experties",webPages:"add-social-media-link",location:"add-current-location"},this.setConfig=function(){this.config.pdata.id=org.sunbird.portal.appid,this.config.channel=org.sunbird.portal.channel,this.config.uid=t.userId,this.config.sid=t.sessionId},this.init=function(){this.setConfig(),console.log("Initialize telemetry"),EkTelemetry.initialize(this.config)},this.start=function(t){t.context&&this.context.push(t.context),EkTelemetry.start(this.config,t.contentId,t.contentVer,t.edata,{context:t.context,object:t.object,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)})},this.end=function(t){console.log("Portal end event");var e=this.context.pop();EkTelemetry.end(t.edata,{context:e,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)}),EkTelemetry.resetContext(e)},this.impression=function(t){EkTelemetry.impression(t.edata,{context:t.context,object:t.object,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)})},this.interact=function(t){EkTelemetry.interact(t.edata,{context:t.context,object:t.object,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)})},this.log=function(t){EkTelemetry.log(t.edata,{context:t.context,object:t.object,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)})},this.error=function(t){EkTelemetry.error(t.edata,{context:t.context,object:t.object,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)})},this.share=function(t){EkTelemetry.share(t.edata,{context:t.context,object:t.object,tags:_.compact(t.tags)||_.concat([],org.sunbird.portal.channel)})},this.getUserSpec=function(){return{agent:a.navigator.appCodeName,ver:a.navigator.appVersion.split(" (")[0],system:"",platform:a.navigator.platform,raw:a.navigator.userAgent}},this.startEventData=function(t,e,a,i){var n={type:t,mode:a,duration:i,pageid:e,uaspec:this.getUserSpec()};return JSON.parse(JSON.stringify(n))},this.endEventData=function(t,e,a,i,n){var o={type:t,mode:a,duration:i,pageid:e,summary:n};return JSON.parse(JSON.stringify(o))},this.impressionEventData=function(t,e,a,i,n){var o={type:t,subtype:e,pageid:a,uri:i};return n&&(o.visits=n),JSON.parse(JSON.stringify(o))},this.interactEventData=function(t,e,a,i,n){var o={type:t,subtype:e,id:a,pageid:i,target:n};return JSON.parse(JSON.stringify(o))},this.logEventData=function(t,e,a,i,n){var o={type:t,level:e,message:a,pageid:i,params:n};return JSON.parse(JSON.stringify(o))},this.errorEventData=function(t,e,a,i){var n={err:t,errtype:e,stacktrace:a,pageid:i};return JSON.parse(JSON.stringify(n))},this.getItemData=function(t,e,a){var i={id:t,type:e,ver:a};return JSON.parse(JSON.stringify(i))},this.shareEventData=function(t,e,a){var i={type:t,items:e,dir:a};return JSON.parse(JSON.stringify(i))},this.getContextData=function(t){t=t||{};var e={};return e.channel=t.channel||this.config.channel,e.pdata=this.config.pdata,e.env=t.env||this.config.env,e.sid=this.config.sid,e.cdata=t.cdata,e.rollup=t.rollup,JSON.parse(JSON.stringify(e))},this.getObjectData=function(t){t=t||{};var e={};return e.id=t.id,e.type=t.type,e.ver=t.ver,t.rollup&&Object.keys(t.rollup).length>0&&(e.rollup=t.rollup),t.section&&(e.section=t.section),JSON.parse(JSON.stringify(e))},this.getRollUpData=function(t){var e={},a=1;return t=t||[],t.constructor===Array&&t.forEach(function(t){e["l"+a]=t,a+=1}),e},this.setConfigData=function(t,e){this.configData[t]=e},this.interactTelemetryData=function(e,a,i,n,o,r,s){var c={env:e,rollup:this.getRollUpData(t.organisationIds)},l={id:a,type:i,ver:n,rollup:this.getRollUpData(s)},d={edata:this.interactEventData("CLICK","",o,r),context:this.getContextData(c),object:this.getObjectData(l),tags:_.concat([],org.sunbird.portal.channel)};this.interact(d)},this.impressionTelemetryData=function(e,a,i,n,o,r,s,c,l){var d={env:e,rollup:this.getRollUpData(t.organisationIds)},p={};a&&a.length>0&&(p={id:a,type:i,ver:n,rollup:this.getRollUpData(c)});var g={edata:this.impressionEventData("view",o,r,s,l),context:this.getContextData(d),object:this.getObjectData(p),tags:_.concat([],org.sunbird.portal.channel)};this.impression(g)},this.startTelemetryData=function(e,a,i,n,o,r,s){var c={env:e,rollup:this.getRollUpData(t.organisationIds)},l={id:a,type:i,ver:n},d={edata:this.startEventData(o,r,s),contentId:a,contentVer:t.version,context:this.getContextData(c),object:this.getObjectData(l),tags:_.concat([],org.sunbird.portal.channel)};this.start(d)},this.endTelemetryData=function(e,a,i,n,o,r,s){var c={env:e,rollup:this.getRollUpData(t.organisationIds)},l={id:a,type:i,ver:n},d={edata:this.endEventData(o,r,s),contentId:a,contentVer:t.version,context:this.getContextData(c),object:this.getObjectData(l),tags:_.concat([],org.sunbird.portal.channel)};this.end(d)},this.shareTelemetryData=function(e,a,i,n){var o={env:e,rollup:this.getRollUpData(t.organisationIds)},r={id:a,type:i,ver:n},s=[this.getItemData(a,i,n)],c={edata:this.shareEventData("Link",s,"Out"),context:this.getContextData(o),object:this.getObjectData(r),tags:_.concat([],org.sunbird.portal.channel)};this.share(c)},this.errorTelemetryData=function(e,a,i,n,o,r,s){var c={env:e,rollup:this.getRollUpData(t.organisationIds)},l={id:t.userId,type:a,ver:i},d={edata:this.errorEventData(n,o,r,s),context:this.getContextData(c),object:this.getObjectData(l),tags:_.concat([],org.sunbird.portal.channel)};this.error(d)},this.setVisitData=function(t){this.visitData=t},this.getVisitData=function(){return this.visitData}}]);