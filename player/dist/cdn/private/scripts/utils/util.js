var content_portal=function(){};window.org={sunbird:{}},org.sunbird.portal=new content_portal,org.sunbird.portal.init=function(){org.sunbird.portal.addUnloadEvent(),org.sunbird.portal.telemetryInit()},org.sunbird.portal.telemetryInit=function(){var r={correlationData:[{id:"",type:""}],user:{uid:org.sunbird.portal.uid},otherData:{channel:org.sunbird.portal.channel,pdata:{id:org.sunbird.portal.appid,ver:"1.0",pid:"sunbird-portal"},etags:{app:[],partner:[],dims:org.sunbird.portal.dims},sid:org.sunbird.portal.sid,did:"",mid:""}};org.sunbird.portal.eventManager.dispatchEvent("sunbird:telemetry:init",r)};